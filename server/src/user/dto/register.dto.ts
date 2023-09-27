import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { LoginDto } from './login.dto';

@InputType()
export class RegisterDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  lastname: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @MaxLength(23)
  @MinLength(8)
  @Field()
  password_confirmation: string;

  @IsString()
  @Field(() => String, { nullable: true })
  company?: string;

  @IsNumber()
  @Field(() => Int, { nullable: true })
  phone?: number;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  provider: string;
}
