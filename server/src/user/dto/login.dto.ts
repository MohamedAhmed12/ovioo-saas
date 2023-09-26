import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class LoginDto {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(8)
  @Field()
  password: string;
}
