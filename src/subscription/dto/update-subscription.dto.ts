import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { SubscriptionStatusEnum } from '../enums/subscription-status.enum';

@InputType()
export class UpdateSubscriptionDto {
  @IsOptional()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  remaining_credit_hours?: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  extra_bundle_hours?: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  status?: SubscriptionStatusEnum;
}
