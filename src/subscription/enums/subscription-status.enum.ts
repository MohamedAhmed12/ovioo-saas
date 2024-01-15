import { registerEnumType } from '@nestjs/graphql';

export enum SubscriptionStatusEnum {
  ACTIVE = 'Active',
  INSUFFICIENT_CREDIT = 'Insufficient credit',
  EXPIRED = 'Expired',
}

registerEnumType(SubscriptionStatusEnum, { name: 'SubscriptionStatusEnum' });
