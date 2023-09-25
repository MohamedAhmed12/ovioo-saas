import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { isEmail } from 'class-validator';
import { throwError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    if (!isEmail(data.email)) {
      throw new BadRequestException('Email has to be valid!');
    }

    const user = this.UserRepository.create(data);
    return await this.UserRepository.save(user);
  }
}
