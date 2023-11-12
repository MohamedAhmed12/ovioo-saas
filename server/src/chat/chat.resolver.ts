import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AuthGuard } from 'src/shared/middlewares/auth.guard';
import { Task } from 'src/task/task.entity';
import { User } from 'src/user/user.entity';
import { ChatService } from './chat.service';
import { ListMessageDto } from './dto/list-message.dto';
import { MessageSentSubscriptionDto } from './dto/message-sent-subs.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './message.entity';

@Resolver(() => Message)
export class ChatResolver {
  private pubSub: PubSub;

  constructor(private readonly chatService: ChatService) {
    this.pubSub = new PubSub();
  }

  @UseGuards(AuthGuard)
  @Query(() => [Message])
  async listMessages(@Args('data') data: ListMessageDto) {
    return await this.chatService.listMessages(data);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Task])
  async listTaskUnreadMessages(@Context('user') authUser: User) {
    return await this.chatService.listTaskUnreadMessages(authUser);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Message)
  async sendMessage(
    @Context('user') authUser: User,
    @Args('data') data: SendMessageDto,
  ) {
    const message = await this.chatService.sendMessage(authUser, data);
    this.pubSub.publish('messageSent', { messageSent: message });

    return message;
  }

  @UseGuards(AuthGuard)
  @Subscription((returns) => Message, {
    filter: async (payload: any, variables: any) => {
      if (variables.data?.task_id) {
        return payload.messageSent.task.id == variables.data.task_id;
      }

      if (variables.data?.team_id) {
        const msgTeam = await payload.messageSent.task.team;
        return msgTeam.id == variables.data.team_id;
      }
    },
  })
  messageSent(@Args('data') data: MessageSentSubscriptionDto) {
    return this.pubSub.asyncIterator('messageSent');
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async updateMessage(@Args('data') data: UpdateMessageDto) {
    return await this.chatService.updateMessage(data);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async receiveAllSentMessages(@Context('user') authUser: User) {
    return await this.chatService.receiveAllSentMessages(authUser);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async readTaskMessages(
    @Context('user') authUser: User,
    @Args('taskId') taskId: string,
  ) {
    return await this.chatService.readTaskMessages(authUser, taskId);
  }
}
