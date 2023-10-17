import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { Project } from 'src/project/project.entity';
import { User } from 'src/user/user.entity';
import { TaskType } from './task-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project, User, TaskType])],
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}
