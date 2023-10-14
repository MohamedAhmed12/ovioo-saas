import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  avatar?: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  fullname?: string;

  @IsEmail()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  phone?: number;
}
