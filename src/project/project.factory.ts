import { faker } from '@faker-js/faker';
import { Project } from './project.entity';

export const projectFactory: (data?: Partial<Project>) => Partial<Project> = (
  data?: Partial<Project>,
) => ({
  title: faker.string.alpha(5),
  description: faker.string.alpha(5),
  ...data,
});
