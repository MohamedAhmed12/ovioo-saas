import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ChatService } from './chat.service';
import { MessageSentSubscriptionDto } from './dto/message-sent-subs.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { Message } from './message.entity';

@Resolver(() => Message)
export class ChatResolver {
  private pubSub: PubSub;

  constructor(private readonly chatService: ChatService) {
    this.pubSub = new PubSub();
  }

  @Mutation(() => Message)
  async sendMessage(@Args('data') data: SendMessageDto) {
    const message = await this.chatService.sendMessage(data);
    this.pubSub.publish('messageSent', { messageSent: message });

    return message;
  }

  @Subscription((returns) => Message, {
    filter: (payload: any, variables: any) =>
      payload.messageSent.task.id == variables.data.task_id,
  })
  messageSent(@Args('data') data: MessageSentSubscriptionDto) {
    return this.pubSub.asyncIterator('messageSent');
  }
}
