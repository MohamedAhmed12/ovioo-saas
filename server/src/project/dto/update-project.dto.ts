import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateProjectDto } from './create-project.dto copy';

@InputType()
export class UpdateProjectDto extends CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  id: number;
}
