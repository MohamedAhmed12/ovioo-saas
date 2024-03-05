import {
  Controller,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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
  private readonly logger = new Logger('stripe serve');

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
      event = await this.stripeClient.webhooks.constructEvent(
        rawBody,
        signatur,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
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
        const { id: stripe_id, status } = event.data.object;
        await this.subscriptionService.createSubscription(
          stripe_id,
          status,
          team,
          plan,
        );
        break;
      case 'invoice.payment_succeeded':
        await this.handleInvoicePayment(
          event.data.object.subscription,
          SubscriptionStatusEnum.ACTIVE,
        );
        break;
      case 'invoice.payment_failed':
        await this.handleInvoicePayment(
          event.data.object.subscription,
          SubscriptionStatusEnum.INCOMPLETE,
        );
        break;
      case 'charge.succeeded':
        await this.handleChargeSucceeded(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await this.handleStripeSubDeleted(event.data.object);
        break;
      case 'customer.subscription.updated':
        await this.handleStripeSubUpdated(event.data.object);
        break;
      default:
    }

    return {
      status: HttpStatus.OK,
      message: { received: true },
    };
  }

  private async handleInvoicePayment(stripeSubscription, newStatus) {
    if (!stripeSubscription) {
      return;
    }

    const subscription = await this.subscriptionService.findSubscription(
      stripeSubscription.id,
      [SubscriptionStatusEnum.INCOMPLETE],
    );

    await this.subscriptionService.updateSubscription(subscription, {
      status: newStatus,
    });
  }

  private async handleChargeSucceeded(data) {
    const team = await this.teamRepository.findOneBy({
      stripe_client_reference_id: data?.customer,
    });

    team.card_last4 = data.payment_method_details.card.last4;
    this.teamRepository.save(team);
  }

  private async handleStripeSubDeleted(data) {
    if (data.status == 'canceled') {
      const canceled_at = new Date(data.canceled_at * 1000);
      const subscription = await this.subscriptionRepository.findOneBy({
        stripe_id: data.id,
      });

      await this.subscriptionService.updateSubscription(subscription, {
        status: SubscriptionStatusEnum.CANCELED,
        canceled_at,
      });
    }
  }

  private async handleStripeSubUpdated(data) {
    if (data.status == 'active') {
      const subscription =
        await this.subscriptionService.findActiveSubscription(data.id);

      if (data.plan != subscription.plan) {
        const newPlan = await this.planRepository.findOneBy({
          stripe_id: data.plan.id,
        });

        await this.subscriptionService.updateSubscription(subscription, {
          status: SubscriptionStatusEnum.CHANGED,
        });

        const newSubscription = await this.subscriptionRepository.create({
          status: SubscriptionStatusEnum.ACTIVE,
          total_credit_hours: newPlan.monthly_credit_hours,
          remaining_credit_hours: subscription.remaining_credit_hours,
          daily_deducted_hours: newPlan.daily_deducted_hours,
          start_at: new Date(),
          stripe_id: subscription.stripe_id,
          team: subscription.team,
          plan: newPlan,
        });
        await this.subscriptionRepository.save(newSubscription);
      }
    }
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
