import { registerEnumType } from '@nestjs/graphql';

export enum UserRoleEnum {
  User = 'user',
  Member = 'member',
  Admin = 'admin',
  Designer = 'designer',
  AccountManager = 'account-manager',
  Agency = 'agency',
}

registerEnumType(UserRoleEnum, { name: 'UserRoleEnum' });
