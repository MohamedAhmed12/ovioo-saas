import { registerEnumType } from '@nestjs/graphql';

export enum TaskStatusEnum {
  InQueue = 'In queue',
  InProgress = 'In progress',
  REVIEW = 'Review',
  OnHold = 'On hold',
  DONE = 'Done',
}

registerEnumType(TaskStatusEnum, { name: 'TaskStatusEnum' });
