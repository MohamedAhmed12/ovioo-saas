import { registerEnumType } from '@nestjs/graphql';

export enum SubscriptionStatusEnum {
  ACTIVE = 'Active',
  INSUFFICIENT_CREDIT = 'Insufficient credit',
  INCOMPLETE = 'incomplete',
  CANCELED = 'Canceled',
  CHANGED = 'changed',
}

registerEnumType(SubscriptionStatusEnum, { name: 'SubscriptionStatusEnum' });
