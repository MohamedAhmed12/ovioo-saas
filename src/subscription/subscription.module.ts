import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanExtraBundle } from 'src/plan/plan-extra-bundle.entity';
import { Plan } from 'src/plan/plan.entity';
import { StripeService } from './stripe.service';
import { OviooSubscription } from './subscription.entity';
import { SubscriptionResolver } from './subscription.resolver';
import { SubscriptionService } from './subscription.service';
import { StripeController } from './stripe.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([OviooSubscription, Plan, PlanExtraBundle]),
  ],
  providers: [SubscriptionResolver, SubscriptionService, StripeService],
  controllers: [StripeController],
})
export class SubscriptionModule {}
