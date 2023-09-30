import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/shared/middlewares/auth.guard';
import { AuthGuardUserDto } from 'src/user/dto/auth-guard-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(new AuthGuard())
  @Query(() => Profile)
  async findProfile(@Context('user') authGuardUser: AuthGuardUserDto) {
    return this.profileService.find(authGuardUser);
  }

  @Mutation(() => Profile)
  async updateProfile(@Args('profile') updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(updateProfileDto);
  }
}
