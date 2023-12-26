import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class ReadMessageArgsDto {
  @IsOptional()
  @IsString()
  @Field(() => String)
  userId?: string;

  @IsString()
  @Field(() => String)
  taskId: string;
}
