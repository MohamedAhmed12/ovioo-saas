import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateNotificationDto {
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean)
  is_read?: boolean;
}
