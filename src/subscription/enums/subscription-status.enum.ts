import { registerEnumType } from '@nestjs/graphql';

export enum SubscriptionStatusEnum {
  ACTIVE = 'Active',
  INSUFFICIENT_CREDIT = 'Insufficient credit',
  EXPIRED = 'Expired',
  CANCELED = 'Canceled',
  INCOMPLETE = 'incomplete',
  CHANGED = 'changed',
}

registerEnumType(SubscriptionStatusEnum, { name: 'SubscriptionStatusEnum' });
