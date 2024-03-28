import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskType } from './task-type.entity';
import { Plan } from 'src/plan/plan.entity';

@Injectable()
export class TaskTypeSeeder {
  constructor(
    @InjectRepository(TaskType)
    private readonly taskTypeRepository: Repository<TaskType>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  async seed() {
    const proPlan = await this.planRepository.findOneBy({ title: 'Pro' });
    const standardPlan = await this.planRepository.findOneBy({
      title: 'Standard',
    });

    const taskTypes = [
      {
        title: 'Webflow',
        info: [
          'Landing Page',
          'Business website',
          'E-Commerce',
          'Single website page',
          'Custom pages',
        ],
        extraInfo:
          'We use Webflow in order to make a great website in a short time.',
        planId: proPlan.id,
      },

      {
        title: 'Logo & Identity',
        info: ['Logo Design', 'Brand Guides', 'Signage'],
        extraInfo: null,
        planId: proPlan.id,
      },
      {
        title: 'Website & App',
        info: [
          'Website',
          'Web App',
          'SAAS',
          'Dashboard',
          'Game Interface',
          'PWA',
          'UI Kit',
          'Design System',
          'Product Redesign',
          'Brand Guides',
        ],
        extraInfo: null,
        planId: proPlan.id,
      },
      {
        title: 'Landing Page',
        info: [
          'Splash',
          'Squeeze',
          'Lead Capture',
          'Sales',
          'Unsubscribe',
          'Event/Webinar',
          'PPC',
          'Product Launch',
        ],
        extraInfo: null,
        planId: proPlan.id,
      },
      {
        title: 'Mobile App',
        info: ['App design', 'iOS App', 'Android App'],
        extraInfo: null,
        planId: proPlan.id,
      },
      {
        title: 'Presentation',
        info: [
          'Pitch Decks',
          'Google Slides',
          'Keynote',
          'PowerPoint',
          'Slide decks',
          'Resumes',
        ],
        extraInfo: null,
        planId: proPlan.id,
      },
      {
        title: 'Custom Illustration',
        info: [
          'Custom illustration',
          'Infographics',
          'Icons',
          'Character or Mascot',
          'Technical',
          'illustrations',
          'Digital Art',
          'Stickers',
          'Advertising Design',
        ],
        extraInfo: null,
        planId: proPlan.id,
      },
      {
        title: 'Animation',
        info: [
          'Simple Animations (up to 10 sec)',
          'Animated Banners (up to 30 sec)',
          'Logo Animation',
          'Lottie Animation',
        ],
        extraInfo:
          'The Animation task type is still in beta mode. There might be delays with the updates.',
        planId: proPlan.id,
      },
      {
        title: 'Print & Packing',
        info: [
          'Packaging & Labels',
          'Promotional Material',
          'Business Cards',
          'Stationery',
          'Documents',
          'Flyers',
          'Planner',
          'Brochures',
          'Menu & Catalog',
          'T-shirts',
          'Merchandise',
        ],
        extraInfo: null,
        planId: standardPlan.id,
      },
      {
        title: 'Banner & Digital Ads',
        info: [
          'Banners',
          'Blog graphics',
          'Social Media',
          'Instagram',
          'Facebook',
          'LinkedIn',
          'Twitch',
          'Twitter',
          'YouTube',
          'Other Social',
          'Billboard',
          'Media Content',
        ],
        extraInfo: null,
        planId: standardPlan.id,
      },
      {
        title: 'Email',
        info: ['Email Design', 'Email Signature'],
        extraInfo: null,
        planId: standardPlan.id,
      },
      {
        title: 'Book',
        info: ['Book Cover', 'E-Book', 'Magazine'],
        extraInfo: null,
        planId: standardPlan.id,
      },
      {
        title: 'Photo & Image',
        info: ['Photo Editing', 'Collage', 'Photo Retouching'],
        extraInfo: null,
        planId: standardPlan.id,
      },
    ];

    const taskTypesTable = await this.taskTypeRepository.find();
    if (taskTypesTable.length === 0) {
      await this.taskTypeRepository.save(taskTypes);
    }
  }
}
