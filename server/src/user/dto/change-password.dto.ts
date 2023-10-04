import { Field, InputType } from '@nestjs/graphql';
import {
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchesProperty } from 'src/shared/validators/matches-property.validator';

@InputType()
export class ChangePasswordDto {
  @MaxLength(32)
  @MinLength(8)
  @Field()
  current_password: string;

  @IsStrongPassword()
  @MaxLength(32)
  @MinLength(8)
  @Field()
  password: string;

  @IsStrongPassword()
  @MaxLength(23)
  @MinLength(8)
  @Field()
  @Validate(MatchesProperty, ['password'], {
    message: 'Password confirmation must match password',
  })
  password_confirmation: string;
}
