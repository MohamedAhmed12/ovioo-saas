import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateTaskRelatedEntityDto {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  id: number;
}
