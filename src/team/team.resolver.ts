import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/shared/middlewares/auth.guard';
import { AuthGuardUserDto } from 'src/user/dto/auth-guard-user.dto';
import { Team } from './team.entity';
import { TeamService } from './team.service';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @UseGuards(AuthGuard)
  @Query(() => Team)
  async getUserTeam(@Context('user') authUser: AuthGuardUserDto) {
    return await this.teamService.getUserTeam(authUser);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async deleteTeam(@Args('id') teamId: string) {
    return await this.teamService.deleteTeam(+teamId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async transferOwnership(
    @Args('id') memberId: string,
    @Context('user') authUser: AuthGuardUserDto,
  ) {
    return await this.teamService.transferOwnership(memberId, authUser);
  }
}
