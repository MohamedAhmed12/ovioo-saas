import { UseGuards } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/shared/middlewares/auth.guard';
import { User } from 'src/user/user.entity';
import { StripeService } from './stripe.service';

@Resolver(() => StripeResolver)
export class StripeResolver {
  constructor(private readonly stripeService: StripeService) {}

  @UseGuards(AuthGuard)
  @Query(() => String)
  async generateCustomerSecret(@Context('user') authUser: User) {
    return await this.stripeService.generateCustomerSecret(authUser);
  }

  @UseGuards(AuthGuard)
  @Query(() => String)
  async getManageSubscriptionURL(@Context('user') authUser: User) {
    return await this.stripeService.createBillingPortal(authUser);
  }
}
