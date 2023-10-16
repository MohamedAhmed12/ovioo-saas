import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/middlewares/auth.guard';
import { AuthGuardUserDto } from 'src/user/dto/auth-guard-user.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Task)
  async createTask(@Args('data') data: CreateTaskDto) {
    return await this.taskService.createTask(data);
  }
}
