import {
  Controller,
  Headers,
  Post,
  Get,
  RawBodyRequest,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { StripeService } from './stripe.service';

@Controller('api/stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('/webhooks')
  async handleWebhook(
    @Headers('stripe-signature') signatur: string,
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
  ) {
    const { status, message } = await this.stripeService.handleWebhook(
      signatur,
      req.rawBody,
    );
    return res.status(status).json(message);
  }
}
