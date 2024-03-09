import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from 'src/asset/asset.entity';
import { AssetService } from 'src/asset/asset.service';
import { NotificationModule } from 'src/notification/notification.module';
import { Project } from 'src/project/project.entity';
import { Team } from 'src/team/team.entity';
import { User } from 'src/user/user.entity';
import { TaskType } from './task-type.entity';
import { Task } from './task.entity';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

@Module({
  imports: [
    NotificationModule,
    TypeOrmModule.forFeature([Task, Project, User, TaskType, Asset, Team]),
  ],
  providers: [TaskResolver, TaskService, AssetService],
})
export class TaskModule {}
