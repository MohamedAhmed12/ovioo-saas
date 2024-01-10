import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { AuthGuard } from 'src/shared/middlewares/auth.guard';
import { User } from 'src/user/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskType } from './task-type.entity';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => Task)
export class TaskResolver {
  private pubSub: PubSub;

  constructor(private readonly taskService: TaskService) {
    this.pubSub = new PubSub();
  }

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
  async createTask(
    @Context('user') authUser: User,
    @Args('data') data: CreateTaskDto,
  ) {
    const task = await this.taskService.createTask(data, authUser);
    this.pubSub.publish('taskCreated', {
      taskCreated: task,
    });

    return task;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Task)
  async updateTask(
    @Context('user') authUser: User,
    @Args('data') data: UpdateTaskDto,
  ) {
    const task = await this.taskService.updateTask(authUser, data);
    this.pubSub.publish('taskUpdated', {
      taskUpdated: task,
    });

    return task;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async deleteTask(@Args('id') id: string) {
    return await this.taskService.deleteTask(id);
  }

  @UseGuards(AuthGuard)
  @Subscription(() => Task, {
    filter: async (payload: any, context: any) => {
      const taskTeam = await payload.taskCreated.team;
      return taskTeam.id == context.user.team.id;
    },
  })
  taskCreated() {
    return this.pubSub.asyncIterator('taskCreated');
  }

  @UseGuards(AuthGuard)
  @Subscription(() => Task, {
    filter: async (payload: any, variables: any) => {
      return variables.taskId == payload.taskUpdated.id;
    },
  })
  taskUpdated(@Args('taskId') taskId: string) {
    return this.pubSub.asyncIterator('taskUpdated');
  }
}
