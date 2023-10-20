import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatusEnum } from '../enums/task-status.enum';

@InputType()
export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  id: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  title: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description: string;

  @IsOptional()
  @IsString()
  @Field(() => TaskStatusEnum, { nullable: true })
  status: TaskStatusEnum;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  type_id: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  project_id: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  designer_id: number;
}
