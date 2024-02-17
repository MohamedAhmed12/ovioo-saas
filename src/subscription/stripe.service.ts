import { Controller, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import Stripe from 'stripe';

@Controller()
export class StripeService {
  private readonly stripeClient: Stripe;

  constructor() {
    this.stripeClient = new Stripe(process.env.STRIPE_API_KEY, {
      typescript: true,
      apiVersion: '2023-10-16',
    });
  }

  async handleWebhook(signatur: string, rawBody: string | Buffer) {
    let event: Stripe.Event;

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

    // Successfully constructed event
    console.log('✅ Success:', event.id);

    // Cast event data to Stripe object
    if (event.type === 'payment_intent.succeeded') {
      const stripeObject: Stripe.PaymentIntent = event.data
        .object as Stripe.PaymentIntent;
      console.log(`💰 PaymentIntent status: ${stripeObject.status}`);
    } else if (event.type === 'charge.succeeded') {
      const charge = event.data.object as Stripe.Charge;
      console.log(`💵 Charge id: ${charge.id}`);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    return {
      status: HttpStatus.OK,
      message: { received: true },
    };
  }
}
