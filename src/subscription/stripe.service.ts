import { Controller, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from 'src/plan/plan.entity';
import { Team } from 'src/team/team.entity';
import { User } from 'src/user/user.entity';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { SubscriptionService } from './subscription.service';
import { OviooSubscription } from './subscription.entity';
import { SubscriptionStatusEnum } from './enums/subscription-status.enum';

@Controller()
export class StripeService {
  private readonly stripeClient: Stripe;

  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
    @InjectRepository(OviooSubscription)
    private readonly subscriptionRepository: Repository<OviooSubscription>,
    private readonly subscriptionService: SubscriptionService,
  ) {
    this.stripeClient = new Stripe(process.env.STRIPE_API_KEY, {
      typescript: true,
      apiVersion: '2023-10-16',
    });
  }

  async createStripeCustomer(
    name?: string,
  ): Promise<Stripe.Response<Stripe.Customer>> {
    try {
      return await this.stripeClient.customers.create({ name });
    } catch (error) {
      throw error;
    }
  }

  async generateCustomerSecret(authUser: User): Promise<string> {
    const customerSession = await this.stripeClient.customerSessions.create({
      customer: authUser.teams[0].stripe_client_reference_id,
      components: {
        pricing_table: {
          enabled: true,
        },
      },
    });

    return customerSession.client_secret;
  }

  async createBillingPortal(authUser: User): Promise<string> {
    const billingPortal = await this.stripeClient.billingPortal.sessions.create(
      {
        customer: authUser.teams[0].stripe_client_reference_id,
        return_url: `${process.env.FRONTEND_URL}/dashboard/payment`,
      },
    );

    return billingPortal.url;
  }

  async handleWebhook(signatur: string, rawBody: string | Buffer) {
    let event;

    try {
      event = this.stripeClient.webhooks.constructEvent(
        rawBody,
        signatur,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      return {
        status: HttpStatus.BAD_REQUEST,
        message: `Webhook Error: ${err.message}`,
      };
    }

    const [team, plan]: [Team, Plan] = await this.getWebhookEventRelatedModels(
      event,
    );

    switch (event.type) {
      case 'customer.subscription.created':
        await this.subscriptionService.createSubscription(
          event.data.object.id,
          team,
          plan,
        );
        break;
      case 'customer.subscription.deleted':
        await this.handleStripeSubUpdated(event.data.object);
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }

    return {
      status: HttpStatus.OK,
      message: { received: true },
    };
  }

  private async handleStripeSubUpdated(data) {
    if (data.status == 'canceled') {
      const canceled_at = new Date(data.canceled_at * 1000);
      const subscription = await this.subscriptionRepository.findOneBy({
        stripe_id: data.id,
      });

      await this.subscriptionService.updateSubscription(subscription, {
        status: SubscriptionStatusEnum.CANCELED,
        canceled_at,
      });
    } else {
      console.log('normal', data, 'normal');
    }

    console.log(data);

    // if (!subscription)
    // throw new NotFoundException('Couldn’t find subscription matches id.');

    //   await this.subscriptionService.cancelSubscription(team, plan);
  }

  private async getWebhookEventRelatedModels(event): Promise<[Team, Plan]> {
    let team: Team;
    let plan: Plan;

    if (event.data.object?.customer) {
      team = await this.teamRepository.findOneBy({
        stripe_client_reference_id: event.data.object?.customer,
      });
    }

    if (event.data.object?.plan) {
      plan = await this.planRepository.findOneBy({
        stripe_id: event.data.object?.plan.id,
      });

      if (!plan) throw new NotFoundException('Couldn’t find plan matches id.');
    }

    return [team, plan];
  }
}
