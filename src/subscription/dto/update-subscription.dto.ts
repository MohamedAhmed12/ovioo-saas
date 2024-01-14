import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class UpdateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  id: number;

  @IsNumber()
  @IsOptional()
  @Field(() => Number, { nullable: true })
  remaining_credit_hours?: number;

  @IsNumber()
  @IsOptional()
  @Field(() => Number, { nullable: true })
  extra_bundle_hours?: number;

  @IsDate()
  @IsOptional()
  @Field(() => Date, { nullable: true })
  expire_at?: Date;
}
