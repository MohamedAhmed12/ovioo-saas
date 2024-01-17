import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanExtraBundle } from 'src/plan/plan-extra-bundle.entity';
import { Plan } from 'src/plan/plan.entity';
import { User } from 'src/user/user.entity';
import { Not, Repository } from 'typeorm';
import { AddExtraBundleDto } from './dto/add-extra-bundle.dto';
import { DeductRemainingHoursDto } from './dto/deduct-remaining-hours.dto';
import { SubscriptionStatusEnum } from './enums/subscription-status.enum';
import { OviooSubscription } from './subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(OviooSubscription)
    private readonly subscriptionRepository: Repository<OviooSubscription>,
    @InjectRepository(PlanExtraBundle)
    private readonly planExtraBundleRepository: Repository<PlanExtraBundle>,
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
      daily_deducted_hours: plan.daily_deducted_hours,
      start_at: new Date(),
    });
    subscription.team = authUser.team;
    subscription.plan = plan;

    return await this.subscriptionRepository.save(subscription);
  }

  async deductRemainingHours({
    id,
    deducted_hours,
  }: DeductRemainingHoursDto): Promise<OviooSubscription> {
    const subscription = await this.subscriptionRepository.findOneBy({
      id: id,
    });

    return await this.processHoursDeduction(subscription, deducted_hours);
  }

  async handleDailySubscriptionUpdatesJob(): Promise<void> {
    const nonExpiredSubs = await this.subscriptionRepository.find({
      where: {
        status: Not(SubscriptionStatusEnum.EXPIRED),
      },
    });

    for (let sub of nonExpiredSubs) {
      this.expireOutdatedSubscription(sub);

      if (sub.status == SubscriptionStatusEnum.ACTIVE) {
        sub = await this.processHoursDeduction(sub, sub.daily_deducted_hours);
        this.updateStatusBasedOnCredit(sub);
      }
    }

    this.subscriptionRepository.save(nonExpiredSubs);
  }

  async listExtraBundles(planId: string): Promise<PlanExtraBundle[]> {
    return await this.planExtraBundleRepository.find({
      where: {
        plan: {
          id: +planId,
        },
      },
    });
  }

  async addExtraBundle({
    id,
    extra_bundle_id,
  }: AddExtraBundleDto): Promise<OviooSubscription> {
    const subscription = await this.subscriptionRepository.findOneBy({
      id,
    });

    if (!subscription)
      throw new NotFoundException(
        'Couldn’t find subscription matches this id.',
      );

    if (subscription.status == SubscriptionStatusEnum.EXPIRED)
      throw new NotFoundException('This subscription has been expired.');

    const extraBundle = await this.planExtraBundleRepository.findOneBy({
      id: extra_bundle_id,
    });

    if (!extraBundle)
      throw new NotFoundException(
        'Couldn’t find extra bundle matches this id.',
      );

    subscription.extra_bundle_hours += extraBundle.hours;
    subscription.remaining_credit_hours += extraBundle.hours;
    subscription.status = SubscriptionStatusEnum.ACTIVE;
    return this.subscriptionRepository.save(subscription);
  }

  private expireOutdatedSubscription(subscription: OviooSubscription): void {
    const now = new Date();

    if (subscription.expire_at < now) {
      subscription.status = SubscriptionStatusEnum.EXPIRED;
    }
  }

  private async processHoursDeduction(
    subscription: OviooSubscription,
    deducted_hours: number,
  ): Promise<OviooSubscription> {
    if (!subscription)
      throw new NotFoundException(
        'Couldn’t find subscription matches this id.',
      );

    const remaining_credit_hours =
      subscription.remaining_credit_hours < deducted_hours
        ? subscription.remaining_credit_hours
        : subscription.remaining_credit_hours - deducted_hours;

    await this.subscriptionRepository.merge(subscription, {
      remaining_credit_hours,
    });
    await this.subscriptionRepository.update(subscription.id, subscription);

    return subscription;
  }

  private updateStatusBasedOnCredit(subscription: OviooSubscription): void {
    if (
      subscription.remaining_credit_hours == 0 ||
      subscription.remaining_credit_hours < subscription.daily_deducted_hours
    ) {
      subscription.status = SubscriptionStatusEnum.INSUFFICIENT_CREDIT;
    }
  }
}
