import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { Profile } from 'src/profile/profile.entity';
import { DeepPartial, Repository } from 'typeorm';
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
    let user = await this.UserRepository.findOne({
      where: { email: data.email },
    });

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
      throw new BadRequestException(
        'Couldn’t find an Ovioo account associated with this email.',
      );

    if (await !compareSync(data.password, user?.password))
      throw new UnauthorizedException("That's not the right password.");

    return user;
  }

  async register(data: RegisterDto): Promise<User> {
    const user = await this.UserRepository.findOne({
      where: { email: data.email },
    });

    if (user) {
      throw new BadRequestException('Email already registered');
    }

    return await this.createUseWithRelatedEntities(data);
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
