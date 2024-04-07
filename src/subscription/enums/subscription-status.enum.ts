import { registerEnumType } from '@nestjs/graphql';

export enum SubscriptionStatusEnum {
  ACTIVE = 'active',
  INSUFFICIENT_CREDIT = 'insufficient credit',
  INCOMPLETE = 'incomplete',
  CANCELED = 'canceled',
  CHANGED = 'changed',
}

registerEnumType(SubscriptionStatusEnum, { name: 'SubscriptionStatusEnum' });
