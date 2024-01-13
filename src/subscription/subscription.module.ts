import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from 'src/plan/plan.entity';
import { User } from 'src/user/user.entity';
import { OviooSubscription } from './subscription.entity';
import { SubscriptionResolver } from './subscription.resolver';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [TypeOrmModule.forFeature([OviooSubscription, User, Plan])],
  providers: [SubscriptionResolver, SubscriptionService],
})
export class SubscriptionModule {}
