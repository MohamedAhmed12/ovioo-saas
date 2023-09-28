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
  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @MaxLength(32)
  @MinLength(8)
  @Field()
  password: string;
}
