import { faker } from '@faker-js/faker';
import { Plan } from './plan.entity';

export const planFactory: (data?: Partial<Plan>) => Partial<Plan> = (data) => {
  return {
    title: faker.string.alpha(5),
    description: faker.lorem.sentences(2),
    monthly_credit_hours: 40,
    remaining_credit_hours: 40,
    daily_deducted_hours: 0,
    services: [faker.lorem.sentence(5), faker.lorem.sentence(5)],
    ...data,
  };
};
