import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from 'src/plan/plan.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { DeductRemainingHoursDto } from './dto/deduct-remaining-hours.dto';
import { OviooSubscription } from './subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(OviooSubscription)
    private readonly subscriptionRepository: Repository<OviooSubscription>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  async createSubscription(
    authUser: User,
    planId: string,
  ): Promise<OviooSubscription> {
    const plan = await this.planRepository.findOneBy({ id: +planId });

    if (!plan) throw new NotFoundException('Couldn’t find plan matches id.');

    const subscription = this.subscriptionRepository.create({
      total_credit_hours: plan.monthly_credit_hours,
      remaining_credit_hours: plan.monthly_credit_hours,
      start_at: new Date(),
    });
    subscription.team = authUser.team;
    subscription.plan = plan;

    return await this.subscriptionRepository.save(subscription);
  }

  async deductRemainingHours(
    data: DeductRemainingHoursDto,
  ): Promise<OviooSubscription> {
    const subscription = await this.subscriptionRepository.findOneBy({
      id: data.id,
    });

    if (!subscription)
      throw new NotFoundException(
        'Couldn’t find subscription matches this id.',
      );

    const remaining_credit_hours =
      subscription.remaining_credit_hours == 0
        ? 0
        : subscription.remaining_credit_hours - data.deducted_hours;

    await this.subscriptionRepository.merge(subscription, {
      remaining_credit_hours,
    });
    await this.subscriptionRepository.update(subscription.id, subscription);

    return subscription;
  }
}
