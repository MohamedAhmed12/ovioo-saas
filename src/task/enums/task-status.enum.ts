import { registerEnumType } from '@nestjs/graphql';

export enum TaskStatusEnum {
  IN_QUEUE = 'In queue',
  IN_PROGRESS = 'In progress',
  REVIEW = 'Review',
  ON_HOLD = 'On hold',
  DONE = 'Done',
}

registerEnumType(TaskStatusEnum, { name: 'TaskStatusEnum' });
