import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { MessageSentSubscriptionDto } from './message-sent-subs.dto';

@InputType()
export class SendMessageDto extends MessageSentSubscriptionDto {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  content?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  voice_note_src?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  asset_src?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  sender_id?: number;
}
