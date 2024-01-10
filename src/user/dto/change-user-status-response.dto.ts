import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';

@ObjectType()
export class ChangeUserStatusResponseDto {
  @IsString()
  @Field(() => String)
  id: string;

  @IsString()
  @Field(() => String, { nullable: true })
  avatar: string;

  @IsString()
  @Field(() => String)
  fullname: string;

  @IsBoolean()
  @Field(() => Boolean)
  isActive: boolean;
}
