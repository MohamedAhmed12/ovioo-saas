import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './plan.entity';

@Injectable()
export class PlanSeeder {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  async seed() {
    const plans = [
      {
        title: 'Standard',
        description:
          'Best fit for your marketing and Social media needs. Achieve fast & high-quality graphic design results that will take your business to the next level!',
        daily_fees: 43,
        monthly_fees: 799,
        quarterly_fees: 2049,
        annual_fees: 7199,
        monthly_credit_hours: 80,
        daily_deducted_hours: 4,
        services: [
          'Social media',
          'Print & Packaging Design',
          'Email',
          'Book & Magazine',
          'Photo Retouch',
          'Flyer & Brochure',
          'Roll Up & Banner',
        ],
        is_full_time: false,
        is_most_popular: false,
        stripe_id: process.env.STRIPE_STANDARD_PLAN_ID,
      },
      {
        title: 'Pro',
        description:
          'Perfect match for startups and enterprise companies. Full range of design projects to help you leverage a design solution your brand can rely on.',
        daily_fees: 97,
        monthly_fees: 1999,
        quarterly_fees: 4339, // Need recalculation
        annual_fees: 15299, // Need recalculation
        monthly_credit_hours: 80,
        daily_deducted_hours: 4,
        services: [
          'Logo & Brand identity',
          'Presentations & Editorials',
          'illustrations',
          'Motion Design',
          'Shorts & Reels',
          'All Tasks from Standerd Plan',
          'UI/UX Design',
        ],
        background_color: 'neutral.500',
        is_full_time: false,
        is_most_popular: true,
        stripe_id: process.env.STRIPE_PRO_PLAN_ID,
      },
      {
        title: '1 to 1',
        description:
          'Ideal for businesses looking for an in-house designer. Forget the hassle of hiring and managing. Accomplish any of your design projects with a top designer!',
        daily_fees: null,
        monthly_fees: null,
        quarterly_fees: null,
        annual_fees: null,
        services: [
          'Full time Dedicated Designer',
          'Unlimited Active Tasks',
          'Motion graphics (unlimited duration)',
          'Building Visual Brand Identity',
          'Improving Product Design',
          'High-value UI/UX Complexity',
          'Industry-focused Professional',
        ],
        background_color: 'neutral.900',
        is_full_time: true,
        is_most_popular: true,
      },
    ];

    const plansTable = await this.planRepository.find();
    if (plansTable.length === 0) {
      await this.planRepository.save(plans);
    }
  }
}
