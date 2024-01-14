import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/shared/middlewares/auth.guard';
import { User } from 'src/user/user.entity';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
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
  async deductSubscriptionRemainingHours(
    @Args('data') data: UpdateSubscriptionDto,
  ) {
    return await this.subscriptionService.update(data);
  }
}
