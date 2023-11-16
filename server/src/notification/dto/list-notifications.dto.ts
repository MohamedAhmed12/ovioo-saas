import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class ListNotificationsDto {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number)
  page: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  limit?: number;
}
