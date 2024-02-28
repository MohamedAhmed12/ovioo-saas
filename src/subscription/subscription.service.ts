import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanExtraBundle } from 'src/plan/plan-extra-bundle.entity';
import { Plan } from 'src/plan/plan.entity';
import { Team } from 'src/team/team.entity';
import { In, Not, Repository } from 'typeorm';
import { AddExtraBundleDto } from './dto/add-extra-bundle.dto';
import { DeductRemainingHoursDto } from './dto/deduct-remaining-hours.dto';
import { SubscriptionStatusEnum } from './enums/subscription-status.enum';
import { OviooSubscription } from './subscription.entity';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

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
    stripe_id: string,
    team: Team,
    plan: Plan,
  ): Promise<OviooSubscription> {
    const subscription = this.subscriptionRepository.create({
      total_credit_hours: plan.monthly_credit_hours,
      remaining_credit_hours: plan.monthly_credit_hours,
      daily_deducted_hours: plan.daily_deducted_hours,
      start_at: new Date(),
      stripe_id,
      team: team,
      plan: plan,
    });

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
    const activeSubs = await this.subscriptionRepository.find({
      where: {
        status: In([
          SubscriptionStatusEnum.ACTIVE,
          SubscriptionStatusEnum.INSUFFICIENT_CREDIT,
        ]),
      },
    });

    for (let sub of activeSubs) {
      this.expireOutdatedSubscription(sub);

      if (sub.status == SubscriptionStatusEnum.ACTIVE) {
        sub = await this.processHoursDeduction(sub, sub.daily_deducted_hours);
        this.updateStatusBasedOnCredit(sub);
      }
    }

    this.subscriptionRepository.save(activeSubs);
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

    if (
      [
        SubscriptionStatusEnum.EXPIRED,
        SubscriptionStatusEnum.CANCELED,
      ].includes(subscription.status)
    ) {
      throw new NotFoundException(
        `This subscription has been ${subscription.status}.`,
      );
    }

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

    return this.updateSubscription(subscription, {
      remaining_credit_hours,
    });
  }

  private updateStatusBasedOnCredit(subscription: OviooSubscription): void {
    if (
      subscription.remaining_credit_hours == 0 ||
      subscription.remaining_credit_hours < subscription.daily_deducted_hours
    ) {
      subscription.status = SubscriptionStatusEnum.INSUFFICIENT_CREDIT;
    }
  }

  async updateSubscription(
    subscription: OviooSubscription,
    data: UpdateSubscriptionDto,
  ): Promise<OviooSubscription> {
    if (subscription.status == SubscriptionStatusEnum.CANCELED)
      throw new ForbiddenException('You Can’t update canceled subscription.');

    await this.subscriptionRepository.merge(subscription, data);
    await this.subscriptionRepository.update(subscription.id, subscription);

    return subscription;
  }
}
