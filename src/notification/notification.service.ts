import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ListNotificationsResponseDto } from './dto/list-notifications-response.dto';
import { ListNotificationsDto } from './dto/list-notifications.dto';
import { NotificationDto } from './dto/notification.dto';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async listNotifications(
    authUser: User,
    { page, offsetPlus = 0, limit = 10 }: ListNotificationsDto,
  ): Promise<ListNotificationsResponseDto> {
    const offset = (page - 1) * limit + offsetPlus;

    const notifications = await this.notificationRepository
      .createQueryBuilder('notifications')
      .select('notifications')
      .where(`notifications.userId = ${authUser.id}`)
      .orderBy('notifications.created_at', 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();

    const unreadCount = await this.notificationRepository
      .createQueryBuilder('notifications')
      .where(
        'notifications.userId = :userId AND notifications.is_read = false',
        { userId: authUser.id },
      )
      .getCount();

    return {
      notifications,
      unreadCount,
    };
  }

  async sendNotification(data: NotificationDto): Promise<Notification> {
    const notification = await this.notificationRepository.create(data);
    return await this.notificationRepository.save(notification);
  }

  async markNotificationAsRead(id: string): Promise<boolean> {
    const notification = await this.notificationRepository.findOneBy({
      id: +id,
    });

    if (!notification)
      throw new NotFoundException('Couldn’t find notification matches id.');

    const res = await this.notificationRepository.update(notification.id, {
      ...notification,
      is_read: true,
    });

    return Boolean(res.affected == 1);
  }
}
