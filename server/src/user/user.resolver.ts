import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/shared/middlewares/auth.guard';
import { User } from 'src/user/user.entity';
import { AuthGuardUserDto } from './dto/auth-guard-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateSsoUserDto } from './dto/create-sso-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(new AuthGuard())
  @Query(() => User)
  async me(@Context('user') authGuardUser: AuthGuardUserDto) {
    return this.userService.me(authGuardUser);
  }

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

  @UseGuards(new AuthGuard())
  @Mutation(() => Boolean)
  async changePassword(
    @Args('data') data: ChangePasswordDto,
    @Context('user') authGuardUser: AuthGuardUserDto,
  ) {
    return await this.userService.changePassword(data, authGuardUser);
  }
}
