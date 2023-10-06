import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { GraphQLError } from 'graphql';
import { Profile } from 'src/profile/profile.entity';
import { Team } from 'src/team/team.entity';
import { DeepPartial, DeleteResult, Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { CreateSsoUserDto } from './dto/create-sso-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthProviderEnum } from './enums/auth-provider.enum';
import { UserRoleEnum } from './enums/user-role.enum';
import { User } from './user.entity';
import { DeleteMemberDto } from './dto/delete-member.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async login(data: LoginDto): Promise<User> {
    const user = await this.UserRepository.findOne({
      where: { email: data.email },
    });

    if (!user)
      throw new NotFoundException(
        'Couldn’t find an Ovioo account associated with this email.',
      );

    if (await !compare(data.password, user?.password))
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
      relations: ['profile', 'team'],
    });

    if (!user)
      throw new UnauthorizedException(
        'Couldn’t find an Ovioo account associated with this email.',
      );

    return user;
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
    { created_at, updated_at, ...data }: any,
  ): Promise<User> {
    console.log(data);

    const user = await this.UserRepository.findOneBy({ email });
    if (!user) throw new NotFoundException();

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

    member = this.UserRepository.create({
      ...data,
      password: Math.random().toString(36).slice(-10),
      team: currentUser.team,
      provider: AuthProviderEnum.Credentials,
      role: UserRoleEnum.Member,
    });

    const profile = this.profileRepository.create({
      company_name: currentUser.profile.company_name,
    });

    member.profile = profile;

    return await this.UserRepository.save(member);
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
    const member = await this.UserRepository.findOneBy({ id: +data.id });

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
    let user = this.UserRepository.create(data);
    user = await this.UserRepository.save(user);

    const profile = this.profileRepository.create({
      company_name: data.company,
    });

    user.profile = profile;

    const team = this.teamRepository.create({
      owner_id: user.id,
    });

    user.team = team;

    return await this.UserRepository.save(user);
  }
}
