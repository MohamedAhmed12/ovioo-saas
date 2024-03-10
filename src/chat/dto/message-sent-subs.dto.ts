import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';

@InputType()
export class MessageSentSubscriptionDto {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  task_id?: number;

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  teamIds?: number[];
}
