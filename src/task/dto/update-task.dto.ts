import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { UpdateTaskRelatedEntityDto } from './update-task-relations.dto';

@InputType()
export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  id: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  title?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  status?: TaskStatusEnum;

  @IsOptional()
  @Field(() => UpdateTaskRelatedEntityDto, { nullable: true })
  type?: UpdateTaskRelatedEntityDto;

  @IsOptional()
  @Field(() => UpdateTaskRelatedEntityDto, { nullable: true })
  project?: UpdateTaskRelatedEntityDto;
}
