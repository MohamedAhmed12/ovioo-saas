import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MessageStatusEnum } from '../enum/message-status.enum';

@InputType()
export class UpdateMessagesDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  task_id: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  status: MessageStatusEnum;
}
