import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AuthGuard } from 'src/shared/middlewares/auth.guard';
import { User } from 'src/user/user.entity';
import { AuthGuardUserDto } from './dto/auth-guard-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeUserStatusResponseDto } from './dto/change-user-status-response.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { CreateSsoUserDto } from './dto/create-sso-user.dto';
import { DeleteMemberDto } from './dto/delete-member.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  private pubSub: PubSub;

  constructor(private readonly userService: UserService) {
    this.pubSub = new PubSub();
  }

  @UseGuards(new AuthGuard())
  @Query(() => User)
  async me(@Context('user') authGuardUser: AuthGuardUserDto) {
    return this.userService.me(authGuardUser);
  }

  @Mutation(() => User)
  async login(@Args('user') loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Mutation(() => User)
  async register(@Args('user') registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Mutation(() => Boolean)
  async forgetPassword(@Args('email') email: string) {
    return await this.userService.forgetPassword(email);
  }

  @Mutation(() => Boolean)
  async resetPassword(@Args('data') data: ResetPasswordDto) {
    return await this.userService.resetPassword(data);
  }

  @UseGuards(new AuthGuard())
  @Mutation(() => Boolean)
  async changePassword(
    @Args('data') data: ChangePasswordDto,
    @Context('user') authGuardUser: AuthGuardUserDto,
  ) {
    return await this.userService.changePassword(authGuardUser, data);
  }

  @UseGuards(new AuthGuard())
  @Mutation(() => User)
  async updateUser(
    @Args('data') data: UpdateUserDto,
    @Context('user') authGuardUser: User,
  ) {
    return await this.userService.update(authGuardUser, data);
  }

  @UseGuards(new AuthGuard())
  @Mutation(() => User)
  async createMember(
    @Args('member') member: CreateMemberDto,
    @Context('user') authUser: AuthGuardUserDto,
  ) {
    return this.userService.createMember(authUser, member);
  }

  @UseGuards(new AuthGuard())
  @Mutation(() => Boolean)
  async deleteMember(
    @Context('user') authUser: AuthGuardUserDto,
    @Args('member') member: DeleteMemberDto,
  ) {
    return this.userService.deleteMember(authUser, member);
  }

  @Mutation(() => User)
  async findOrCreateSsoUser(@Args('user') createSsoUserDto: CreateSsoUserDto) {
    return this.userService.findOrCreateSsoUser(createSsoUserDto);
  }

  @UseGuards(new AuthGuard())
  @Mutation(() => Boolean)
  async toggleUserStatus(
    @Args('isActive') isActive: boolean,
    @Context('user') authUser: User,
  ) {
    const user = await this.userService.update(authUser, { isActive });

    const { id, avatar, fullname } = authUser;
    this.pubSub.publish('userStatusChanged', {
      id,
      avatar,
      fullname,
      isActive,
    });

    return !!user;
  }

  @UseGuards(AuthGuard)
  @Subscription(() => ChangeUserStatusResponseDto, {
    resolve: (payload) => payload,
  })
  userStatusChanged() {
    return this.pubSub.asyncIterator('userStatusChanged');
  }
}
