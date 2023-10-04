import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Profile } from 'src/profile/profile.entity';
import { DeepPartial, Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateSsoUserDto } from './dto/create-sso-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async findOrCreateSsoUser(data: CreateSsoUserDto): Promise<User> {
    let user = await this.me(data);

    if (!user) {
      user = await this.createUseWithRelatedEntities(data);
    }

    return user;
  }

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
      throw new ConflictException('Email is already registered');
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

    if (isValidCurrentPassword) {
      authUser.password = await hash(data.password, 12);
      await this.UserRepository.save(authUser);

      return true;
    }

    return false;
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

  async createUseWithRelatedEntities(data: DeepPartial<User>): Promise<User> {
    const user = this.UserRepository.create(data);

    const profile = this.profileRepository.create({
      company_name: data.company,
    });

    user.profile = profile;

    return await this.UserRepository.save(user);
  }
}
