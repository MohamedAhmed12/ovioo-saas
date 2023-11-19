import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength, Validate } from 'class-validator';
import { MatchesProperty } from 'src/shared/validators/matches-property.validator';

@InputType()
export class PasswordDto {
  @MaxLength(32)
  @MinLength(8)
  @Field()
  password: string;

  @MaxLength(23)
  @MinLength(8)
  @Field()
  @Validate(MatchesProperty, ['password'], {
    message: 'Password confirmation must match password',
  })
  password_confirmation: string;
}
