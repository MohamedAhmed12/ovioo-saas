import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatusEnum } from '../enums/task-status.enum';

@InputType()
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  title: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  status: TaskStatusEnum;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  project_id: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  type_id: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  parent_id: number;
}
