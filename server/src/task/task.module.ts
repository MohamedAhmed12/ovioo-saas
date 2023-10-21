import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { Project } from 'src/project/project.entity';
import { User } from 'src/user/user.entity';
import { TaskType } from './task-type.entity';
import { AssetService } from 'src/asset/asset.service';
import { Asset } from 'src/asset/asset.entity';
import { Team } from 'src/team/team.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Project, User, TaskType, Asset, Team]),
  ],
  providers: [TaskResolver, TaskService, AssetService],
})
export class TaskModule {}
