import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class DeleteMemberDto {
  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;
}
