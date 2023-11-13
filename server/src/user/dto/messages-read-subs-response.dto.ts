import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Task } from 'src/task/task.entity';

@ObjectType()
export class TaskMessagesReadSubsResponseDto {
  @Field(() => Task)
  task: Task;

  @IsString()
  @Field(() => String)
  fullname: string;
}
