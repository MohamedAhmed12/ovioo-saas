import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmail } from 'class-validator';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async register(data: RegisterDto): Promise<User> {
    if (!isEmail(data.email)) {
      throw new BadRequestException('Email has to be valid!');
    }

    const user = this.UserRepository.create(data);
    return await this.UserRepository.save(user);
  }
}
