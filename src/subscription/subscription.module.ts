import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanExtraBundle } from 'src/plan/plan-extra-bundle.entity';
import { Plan } from 'src/plan/plan.entity';
import { StripeController } from './stripe.controller';
import { StripeResolver } from './stripe.resolver';
import { StripeService } from './stripe.service';
import { OviooSubscription } from './subscription.entity';
import { SubscriptionResolver } from './subscription.resolver';
import { SubscriptionService } from './subscription.service';
import { User } from 'src/user/user.entity';
import { Team } from 'src/team/team.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, OviooSubscription, Plan, PlanExtraBundle]),
  ],
  providers: [
    SubscriptionResolver,
    SubscriptionService,
    StripeResolver,
    StripeService,
  ],
  controllers: [StripeController],
  exports: [StripeService],
})
export class SubscriptionModule {}
