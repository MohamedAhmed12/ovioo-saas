import { registerEnumType } from '@nestjs/graphql';

export enum MessageStatusEnum {
  WAITING = 'waiting',
  SENT = 'sent',
  RECEIVED = 'received',
  READ = 'read',
}

export const unreadMessageStatuses = () => [
  MessageStatusEnum.WAITING,
  MessageStatusEnum.SENT,
  MessageStatusEnum.RECEIVED,
];

registerEnumType(MessageStatusEnum, { name: 'MessageStatusEnum' });
