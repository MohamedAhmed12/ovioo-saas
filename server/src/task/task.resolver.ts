import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/middlewares/auth.guard';
import { AuthGuardUserDto } from 'src/user/dto/auth-guard-user.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskType } from './task-type.entity';
import { User } from 'src/user/user.entity';

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
  @Mutation(() => Task)
  async createTask(@Args('data') data: CreateTaskDto) {
    return await this.taskService.createTask(data);
  }
}
