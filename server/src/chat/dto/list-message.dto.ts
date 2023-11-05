import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { MessageSentSubscriptionDto } from './message-sent-subs.dto';

@InputType()
export class ListMessageDto extends MessageSentSubscriptionDto {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number)
  page: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  offsetPlus?: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  limit?: number;
}
