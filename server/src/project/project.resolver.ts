import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/middlewares/auth.guard';
import { AuthGuardUserDto } from 'src/user/dto/auth-guard-user.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Project)
  async createProject(
    @Args('data') data: CreateProjectDto,
    @Context('user') authUser: AuthGuardUserDto,
  ) {
    return await this.projectService.createProject(authUser, data);
  }
}
