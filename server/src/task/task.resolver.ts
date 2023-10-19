import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/shared/middlewares/auth.guard';
import { User } from 'src/user/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskType } from './task-type.entity';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Query(() => [TaskType])
  async listTaskTypes() {
    return await this.taskService.listTaskTypes();
  }

  @UseGuards(AuthGuard)
  @Query(() => [Task])
  async listTasks(@Context('user') authUser: User) {
    return await this.taskService.listTasks(authUser);
  }

  @UseGuards(AuthGuard)
  @Query(() => Task)
  async showTask(@Context('user') authUser: User, @Args('id') id: string) {
    return await this.taskService.showTask(authUser, id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Task)
  async createTask(@Args('data') data: CreateTaskDto) {
    return await this.taskService.createTask(data);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async deleteTask(@Args('id') id: string) {
    return await this.taskService.deleteTask(id);
  }
}
