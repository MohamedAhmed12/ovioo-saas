import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchesProperty } from 'src/shared/validators/matches-property.validator';
import { LoginDto } from './login.dto';

@InputType()
export class RegisterDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  fullname: string;

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

  @IsString()
  @Field(() => String, { nullable: true })
  company?: string;

  @IsNumber()
  @Field(() => Number, { nullable: true })
  phone?: number;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  provider: string;
}
