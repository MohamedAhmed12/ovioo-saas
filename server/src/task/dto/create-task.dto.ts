import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { TaskTypesEnum } from '../enums/task-types';
import { TaskStatusEnum } from '../enums/task-status.enum';

@InputType()
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  project_id: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  type_id: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => TaskStatusEnum)
  status: TaskStatusEnum;
}
