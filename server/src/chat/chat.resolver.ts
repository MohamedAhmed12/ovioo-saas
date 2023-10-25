import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ChatService } from './chat.service';
import { MessageSentSubscriptionDto } from './dto/message-sent-subs.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { Message } from './message.entity';
import { ListMessageDto } from './dto/list-message.dto';
import { AuthGuard } from 'src/shared/middlewares/auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/user/user.entity';

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
    filter: (payload: any, variables: any) =>
      payload.messageSent.task.id == variables.data.task_id,
  })
  messageSent(@Args('data') data: MessageSentSubscriptionDto) {
    return this.pubSub.asyncIterator('messageSent');
  }
}
