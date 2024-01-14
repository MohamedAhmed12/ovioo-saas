import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from 'src/plan/plan.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
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

  async update(data: UpdateSubscriptionDto): Promise<OviooSubscription> {
    const profile = await this.subscriptionRepository.findOneBy({
      id: data.id,
    });

    if (!profile)
      throw new NotFoundException(
        'Couldn’t find subscription matches this id.',
      );

    await this.subscriptionRepository.merge(profile, data);
    await this.subscriptionRepository.update(profile.id, profile);

    return profile;
  }
}
