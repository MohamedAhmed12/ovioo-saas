import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  avatar?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  fullname?: string;

  @IsEmail()
  @IsOptional()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  phone?: number;
}
