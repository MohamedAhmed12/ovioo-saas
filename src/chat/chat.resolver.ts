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
import { TaskMsgsStatusChangedSubsResponseDto } from 'src/user/dto/task-msgs-status-changed-subs-response.dto';
import { User } from 'src/user/user.entity';
import { ChatService } from './chat.service';
import { ListMessageDto } from './dto/list-message.dto';
import { MessageSentSubscriptionDto } from './dto/message-sent-subs.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageStatusEnum } from './enum/message-status.enum';
import { Message } from './message.entity';

@Resolver(() => Message)
export class ChatResolver {
  private pubSub: PubSub;

  constructor(private readonly chatService: ChatService) {
    this.pubSub = new PubSub();
  }

  @UseGuards(AuthGuard)
  @Query(() => [Message])
  async listTaskMessages(
    @Context('user') authUser: User,
    @Args('data') data: ListMessageDto,
  ) {
    return await this.chatService.listTaskMessages(authUser, data);
  }

  @UseGuards(AuthGuard)
  @Subscription(() => TaskMsgsStatusChangedSubsResponseDto, {
    filter: async (payload: any, variables: any, context: any) => {
      const team = await payload.task.team;
      return team.id == variables.teamId && payload.userId != context.user.id;
    },
    resolve: (payload) => payload,
  })
  taskMsgsStatusChanged(
    @Context('user') authUser: User,
    @Args('teamId') teamId: string,
  ) {
    return this.pubSub.asyncIterator('taskMsgsStatusChanged');
  }

  @UseGuards(AuthGuard)
  @Query(() => [Task])
  async listUnreadMessages(@Context('user') authUser: User) {
    return await this.chatService.listUnreadMessages(authUser);
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
      const msgTask = await payload.messageSent.task;

      if (variables.data?.task_id) {
        return msgTask.id == variables.data.task_id;
      }

      if (variables.data?.teamIds) {
        const msgTeam = await msgTask.team;
        return variables.data.teamIds.some((id) => id == msgTeam.id);
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
    return this.changeTaskMessagesStatus(
      authUser,
      taskId,
      MessageStatusEnum.READ,
      [MessageStatusEnum.READ],
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async receiveTaskMessages(
    @Context('user') authUser: User,
    @Args('taskId') taskId: string,
  ) {
    return this.changeTaskMessagesStatus(
      authUser,
      taskId,
      MessageStatusEnum.RECEIVED,
      [MessageStatusEnum.RECEIVED, MessageStatusEnum.READ],
    );
  }

  private async changeTaskMessagesStatus(
    authUser: User,
    taskId: string,
    status: MessageStatusEnum,
    excludeStatuses: MessageStatusEnum[],
  ) {
    const messages = await this.chatService.changeTaskMessagesStatus(
      authUser,
      taskId,
      status,
      excludeStatuses,
    );

    if (messages.length > 0) {
      this.publishMessageStatusChange(messages[0], authUser, status);
    }

    return true;
  }

  private async publishMessageStatusChange(
    message: Message,
    { id, fullname }: User,
    status: string,
  ) {
    this.pubSub.publish('taskMsgsStatusChanged', {
      task: await message.task,
      userId: id,
      fullname,
      status,
    });
  }
}
