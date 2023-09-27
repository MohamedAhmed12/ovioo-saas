import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { CreateSsoUserDto } from './dto/create-sso-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async findOrCreateSsoUser(@Args('user') createSsoUserDto: CreateSsoUserDto) {
    return this.userService.findOrCreateSsoUser(createSsoUserDto);
  }

  @Mutation(() => User)
  async login(@Args('user') loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Mutation(() => User)
  async register(@Args('user') registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }
}
