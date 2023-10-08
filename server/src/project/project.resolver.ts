import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/shared/middlewares/auth.guard';
import { AuthGuardUserDto } from 'src/user/dto/auth-guard-user.dto';
import { CreateProjectDto } from './dto/create-project.dto copy';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './project.entity';
import { ProjectService } from './project.service';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(AuthGuard)
  @Query(() => [Project])
  async listProjects(@Context('user') authUser: AuthGuardUserDto) {
    return await this.projectService.listProjects(authUser);
  }

  @UseGuards(AuthGuard)
  @Query(() => Project)
  async showProject(@Args('data') id: number) {
    return await this.projectService.showProject(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Project)
  async createProject(
    @Args('data') data: CreateProjectDto,
    @Context('user') authUser: AuthGuardUserDto,
  ) {
    return await this.projectService.createProject(authUser, data);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async updateProject(@Args('data') data: UpdateProjectDto) {
    return await this.projectService.updateProject(data);
  }
}
