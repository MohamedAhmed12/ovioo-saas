import { registerEnumType } from '@nestjs/graphql';

export enum SubscriptionStatusEnum {
  ACTIVE = 'Active',
  INSUFFICIENT_CREDIT = 'Insufficient credit',
  EXPIRED = 'Expired',
  CANCELED = 'Canceled',
}

registerEnumType(SubscriptionStatusEnum, { name: 'SubscriptionStatusEnum' });
