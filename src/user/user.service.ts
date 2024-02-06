import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcryptjs';
import { GraphQLError } from 'graphql';
import { Profile } from 'src/profile/profile.entity';
import { TeamService } from 'src/team/team.service';
import { DeepPartial, Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { CreateSsoUserDto } from './dto/create-sso-user.dto';
import { DeleteMemberDto } from './dto/delete-member.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthProviderEnum } from './enums/auth-provider.enum';
import { UserRoleEnum } from './enums/user-role.enum';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly mailerService: MailerService,
    private readonly teamService: TeamService,
  ) {}

  async login(data: LoginDto): Promise<User> {
    const user = await this.UserRepository.findOne({
      where: { email: data.email },
    });

    if (!user)
      throw new NotFoundException(
        'Couldn’t find an Ovioo account associated with this email.',
      );

    const isCorreectPassword = await compare(data.password, user?.password);

    if (!isCorreectPassword)
      throw new NotFoundException("That's not the right password.");

    return user;
  }

  async register(data: RegisterDto): Promise<User> {
    const user = await this.UserRepository.findOne({
      where: { email: data.email },
    });

    if (user) {
      throw new ConflictException('Email has already been taken');
    }

    return await this.createUseWithRelatedEntities(data);
  }

  async me({
    email,
    provider,
  }: {
    email: string;
    provider: string;
  }): Promise<User> {
    const user = await this.UserRepository.findOne({
      where: {
        email,
        provider,
      },
      relations: ['profile'],
    });

    if (!user)
      throw new UnauthorizedException(
        'Couldn’t find an Ovioo account associated with this email.',
      );

    return user;
  }

  async forgetPassword(email: string): Promise<boolean> {
    const user = await this.UserRepository.findOneBy({ email });
    if (!user)
      throw new GraphQLError(
        'Couldn’t find an Ovioo account associated with this email.',
        {
          extensions: {
            originalError: {
              message: [
                {
                  email:
                    'Couldn’t find an Ovioo account associated with this email.',
                },
              ],
            },
          },
        },
      );

    const resetToken = await hash(Math.random().toString(36).slice(-12), 12);
    user.resetToken = resetToken.replace(/[^a-zA-Z0-9]/g, '');

    const now = new Date();
    const oneHourFromNow = new Date(now);
    oneHourFromNow.setHours(now.getHours() + 1);
    user.resetTokenExpired_at = oneHourFromNow;
    this.UserRepository.save(user);

    const resetLink = `${process.env.FRONTEND_URL}/auth/password/reset/${user.resetToken}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Password',
      template: 'reset-password',
      context: {
        resetLink,
        user,
      },
    });

    return true;
  }

  async resetPassword({
    resetToken,
    password,
  }: ResetPasswordDto): Promise<boolean> {
    const user = await this.UserRepository.findOneBy({ resetToken });
    const isValidCode = user && new Date() < user?.resetTokenExpired_at;

    if (!isValidCode)
      throw new GraphQLError('token', {
        extensions: {
          originalError: {
            message: [
              {
                resetToken:
                  'Invalid password reset code, Please ensure you are using the correct link from the latest email. If your code has expired, you can request a new password reset link',
              },
            ],
          },
        },
      });

    user.password = await hash(password, 12);
    await this.UserRepository.save(user);

    return true;
  }

  async changePassword(
    { email }: { email: string },
    data: ChangePasswordDto,
  ): Promise<boolean> {
    const authUser = await this.UserRepository.findOneBy({
      email,
    });

    if (authUser.provider != 'credentials' || !authUser.password)
      throw new BadRequestException();

    const isValidCurrentPassword = await compare(
      data.current_password,
      authUser.password,
    );

    if (!isValidCurrentPassword) {
      throw new GraphQLError('Invalid current password', {
        extensions: {
          originalError: {
            message: [{ current_password: 'Invalid current password' }],
          },
        },
      });
    }

    authUser.password = await hash(data.password, 12);
    await this.UserRepository.save(authUser);

    return true;
  }

  async update(
    { email }: { email: string },
    { created_at, updated_at, ...data }: User | Partial<User>,
  ): Promise<User> {
    const user = await this.UserRepository.findOneBy({ email });
    if (!user) throw new NotFoundException();

    delete user.profile;
    await this.UserRepository.merge(user, data);
    this.UserRepository.update(user.id, user);

    return user;
  }

  async createMember(
    {
      email,
      provider,
    }: {
      email: string;
      provider: string;
    },
    data: CreateMemberDto,
  ): Promise<User> {
    const currentUser: User = await this.me({ email, provider });

    let member = await this.UserRepository.findOne({
      where: { email: data.email },
    });

    if (member) {
      throw new GraphQLError('Email has already been taken', {
        extensions: {
          originalError: {
            message: [
              {
                email:
                  'Email has already been taken. Please choose a different email.',
              },
            ],
          },
        },
      });
    }

    const password = Math.random().toString(36).slice(-10);

    member = this.UserRepository.create({
      ...data,
      password,
      teams: currentUser.teams,
      provider: AuthProviderEnum.Credentials,
      role: UserRoleEnum.Member,
    });

    const profile = this.profileRepository.create({
      company_name: currentUser.profile.company_name,
    });

    member.profile = profile;
    member = await this.UserRepository.save(member);

    await this.mailerService.sendMail({
      to: email,
      subject: `${currentUser.email} has invited you to join his team`,
      template: 'new-member',
      context: {
        teamOwner: currentUser,
        email: member.email,
        password,
        loginLink: `${process.env.FRONTEND_URL}/auth/login`,
      },
    });

    return member;
  }

  async deleteMember(
    {
      email,
      provider,
    }: {
      email: string;
      provider: string;
    },
    data: DeleteMemberDto,
  ): Promise<boolean> {
    const currentUser: User = await this.me({ email, provider });
    const member = await this.UserRepository.findOneBy({ id: data.id });

    if (!member) throw new NotFoundException();

    if (
      !currentUser ||
      currentUser?.role !== UserRoleEnum.User ||
      member?.role != UserRoleEnum.Member
    ) {
      throw new ForbiddenException('Not allowed');
    }

    await this.UserRepository.delete(member.id);
    return true;
  }

  async findOrCreateSsoUser(data: CreateSsoUserDto): Promise<User> {
    let user = await this.UserRepository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      user = await this.createUseWithRelatedEntities(data);
    }

    return user;
  }

  async createUseWithRelatedEntities(data: DeepPartial<User>): Promise<User> {
    let user = await this.UserRepository.create(data);
    user = await this.UserRepository.save(user);

    user.profile = await this.profileRepository.create({
      company_name: data.company,
    });

    user.teams = [await this.teamService.createTeam(user.id)];

    return await this.UserRepository.save(user);
  }
}
