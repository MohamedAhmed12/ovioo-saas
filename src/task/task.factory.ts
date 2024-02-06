import { TaskStatusEnum } from './enums/task-status.enum';
import { Task } from './task.entity';

export const taskFactory: (data?: Partial<Task>) => Partial<Task> = (data) => {
  const status: TaskStatusEnum = data?.status || TaskStatusEnum.IN_PROGRESS;

  return {
    title: `${status} task`,
    status: status,
    ...data,
  };
};
