import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  description: string;
}
