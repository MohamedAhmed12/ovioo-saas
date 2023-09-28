import { Args, Query, Resolver } from '@nestjs/graphql';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile)
  async findProfile(@Args('id') id: number) {
    return this.profileService.find(id);
  }
}
