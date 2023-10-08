import { Resolver } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly teamService: TaskService) {}
}
