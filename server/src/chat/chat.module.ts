import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { Message } from './message.entity';
import { Task } from 'src/task/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User, Task])],
  providers: [ChatResolver, ChatService],
})
export class ChatModule {}
