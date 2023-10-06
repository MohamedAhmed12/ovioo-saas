import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { DeleteMemberDto } from './delete-member.dto';

@InputType()
export class CreateMemberDto extends DeleteMemberDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  fullname: string;
}
