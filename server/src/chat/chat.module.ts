import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from 'src/asset/asset.entity';
import { AssetService } from 'src/asset/asset.service';
import { Task } from 'src/task/task.entity';
import { Team } from 'src/team/team.entity';
import { User } from 'src/user/user.entity';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { Message } from './message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User, Task, Asset, Team])],
  providers: [ChatResolver, ChatService, AssetService],
})
export class ChatModule {}
