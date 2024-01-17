import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cron } from '@nestjs/schedule';
import { PlanExtraBundle } from 'src/plan/plan-extra-bundle.entity';
import { AuthGuard } from 'src/shared/middlewares/auth.guard';
import { User } from 'src/user/user.entity';
import { AddExtraBundleDto } from './dto/add-extra-bundle.dto';
import { DeductRemainingHoursDto } from './dto/deduct-remaining-hours.dto';
import { OviooSubscription } from './subscription.entity';
import { SubscriptionService } from './subscription.service';

@Resolver(() => OviooSubscription)
export class SubscriptionResolver {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => OviooSubscription)
  async createSubscription(
    @Context('user') authUser: User,
    @Args('planId') planId: string,
  ) {
    return await this.subscriptionService.createSubscription(authUser, planId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => OviooSubscription)
  async deductRemainingHours(@Args('data') data: DeductRemainingHoursDto) {
    return await this.subscriptionService.deductRemainingHours(data);
  }

  @Cron('5 0 * * *')
  async handleDailySubscriptionUpdatesJob() {
    return await this.subscriptionService.handleDailySubscriptionUpdatesJob();
  }

  @UseGuards(AuthGuard)
  @Query(() => [PlanExtraBundle])
  async listExtraBundles(@Args('planId') planId: string) {
    return await this.subscriptionService.listExtraBundles(planId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => OviooSubscription)
  async addExtraBundle(@Args('data') data: AddExtraBundleDto) {
    return await this.subscriptionService.addExtraBundle(data);
  }
}
