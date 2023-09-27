import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { isEmail } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateSsoUserDto } from './dto/create-sso-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async findOrCreateSsoUser(data: CreateSsoUserDto): Promise<User> {
    let user = await this.UserRepository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      user = this.UserRepository.create(data);
      user = await this.UserRepository.save(user);
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
    if (!isEmail(data.email)) {
      throw new BadRequestException('Email has to be valid!');
    }

    const user = this.UserRepository.create(data);
    return await this.UserRepository.save(user);
  }
}
