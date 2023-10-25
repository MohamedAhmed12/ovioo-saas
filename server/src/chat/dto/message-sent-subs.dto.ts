import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class MessageSentSubscriptionDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  task_id: number;
}
