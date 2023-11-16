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
}
