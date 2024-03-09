import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Notification } from '../notification.entity';

@ObjectType()
export class ListNotificationsResponseDto {
  @IsNotEmpty()
  @Field(() => [Notification])
  notifications: Notification[];

  @IsNotEmpty()
  @Field(() => Number)
  unreadCount: number;
}
