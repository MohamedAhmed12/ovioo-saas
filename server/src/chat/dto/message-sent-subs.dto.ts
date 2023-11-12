import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class MessageSentSubscriptionDto {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  task_id?: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  team_id?: number;
}
