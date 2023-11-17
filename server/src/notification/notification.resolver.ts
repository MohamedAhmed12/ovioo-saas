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
import { User } from 'src/user/user.entity';
import { ListNotificationsDto } from './dto/list-notifications.dto';
import { NotificationDto } from './dto/notification.dto';
import { Notification } from './notification.entity';
import { NotificationService } from './notification.service';

@Resolver(() => Notification)
export class NotificationResolver {
  private pubSub: PubSub;

  constructor(private readonly notificationService: NotificationService) {
    this.pubSub = new PubSub();
  }

  @UseGuards(AuthGuard)
  @Query(() => [Notification])
  async listNotifications(
    @Context('user') authUser: User,
    @Args('data') data: ListNotificationsDto,
  ) {
    return await this.notificationService.listNotifications(authUser, data);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Notification)
  async sendNotification(@Args('data') data: NotificationDto) {
    const notification = await this.notificationService.sendNotification(data);

    this.pubSub.publish('notificationReceived', {
      notificationReceived: notification,
    });

    return notification;
  }

  @UseGuards(AuthGuard)
  @Subscription((returns) => Notification, {
    filter: async (payload: any, variables: any, context: any) =>
      payload.notificationReceived.userId == context.user.id,
  })
  notificationReceived(@Args('data') data: NotificationDto) {
    return this.pubSub.asyncIterator('notificationReceived');
  }
}
