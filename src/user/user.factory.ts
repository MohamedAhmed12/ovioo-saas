import { faker } from '@faker-js/faker';
import { AuthProviderEnum } from './enums/auth-provider.enum';
import { User } from './user.entity';

export const userFactory: (data?: Partial<User>) => Partial<User> = (
  data?: Partial<User>,
) => ({
  fullname: faker.person.fullName(),
  email: data?.email || faker.internet.email(),
  password: '123456789',
  provider: AuthProviderEnum.Credentials,
  created_at: new Date(),
  updated_at: new Date(),
});
