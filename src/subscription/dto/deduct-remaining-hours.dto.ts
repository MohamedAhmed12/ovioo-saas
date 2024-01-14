import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class DeductRemainingHoursDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  id: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  deducted_hours: number;
}
