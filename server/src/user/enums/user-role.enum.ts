import { registerEnumType } from '@nestjs/graphql';

export enum UserRoleEnum {
  User = 'user',
  Member = 'member',
  Admin = 'admin',
  Designer = 'designer',
}

registerEnumType(UserRoleEnum, { name: 'UserRoleEnum' });
