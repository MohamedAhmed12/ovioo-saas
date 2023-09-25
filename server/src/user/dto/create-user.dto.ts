import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field(() => ID)
  id: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  avatar: string;
}
