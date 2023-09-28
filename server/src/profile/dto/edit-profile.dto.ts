import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';

@InputType()
export class ProfileDto {
  @IsString()
  @Field(() => String, { nullable: true })
  company_name: string;

  @IsString()
  @Field(() => String, { nullable: true })
  company_website: string;

  @IsString()
  @Field(() => String, { nullable: true })
  business_info: string;

  @IsString()
  @Field(() => String, { nullable: true })
  target_audience: string;

  @IsString()
  @Field(() => String, { nullable: true })
  company_links: string;

  @IsBoolean()
  @Field(() => Boolean)
  push_notification_enabled: boolean;

  @IsBoolean()
  @Field(() => Boolean)
  mail_notification_enabled: boolean;
}
