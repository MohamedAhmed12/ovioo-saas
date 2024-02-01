import { TaskStatusEnum } from './enums/task-status.enum';
import { Task } from './task.entity';

export const taskFactory: (data: Partial<Task>) => Partial<Task> = (data) => {
  const defaultStatus: TaskStatusEnum = TaskStatusEnum.IN_PROGRESS;

  return {
    title: `${data.status} task`,
    status: data.status || defaultStatus,
    ...data,
  };
};
