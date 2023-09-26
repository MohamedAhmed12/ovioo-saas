import { User } from 'src/user/user.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async login(@Args('user') loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Mutation(() => User)
  async register(@Args('user') registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }
}
