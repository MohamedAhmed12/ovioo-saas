import { registerEnumType } from '@nestjs/graphql';

export enum MessageStatusEnum {
  WAITING = 'waiting',
  SENT = 'sent',
  RECEIVED = 'received',
  READ = 'read',
}

registerEnumType(MessageStatusEnum, { name: 'MessageStatusEnum' });
