import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  id: number;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  company_name?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  company_website?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  business_info?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  target_audience?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  company_links?: string;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  push_notification_enabled?: boolean;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  mail_notification_enabled?: boolean;

  @IsDate()
  @IsOptional()
  @Field(() => Date, { nullable: true })
  created_at?: Date;

  @IsDate()
  @IsOptional()
  @Field(() => Date, { nullable: true })
  updated_at?: Date;
}
