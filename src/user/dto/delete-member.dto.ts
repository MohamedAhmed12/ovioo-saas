import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class DeleteMemberDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  id: number;
}
