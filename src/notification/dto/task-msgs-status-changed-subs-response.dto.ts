import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { MessageStatusEnum } from 'src/chat/enum/message-status.enum';

@ObjectType()
export class NotificationSentSubsResponseDto {
  @Field(() => String)
  status: MessageStatusEnum;

  @IsString()
  @Field(() => String)
  fullname: string;
}
