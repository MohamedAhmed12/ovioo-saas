import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  owner_id: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;
}
