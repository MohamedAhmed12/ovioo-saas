import { DesignerTransaction } from './designerTransaction /designerTransaction.entity';
import { Project } from './project/project.entity';
import { TaskType } from './task/task-type.entity';
import { Task } from './task/task.entity';
import { Team } from './team/team.entity';
import { User } from './user/user.entity';

export const adminJsOptions = {
  rootPath: '/admin',
  resources: [
    Task,
    TaskType,
    Project,
    Team,
    User,
    {
      resource: DesignerTransaction,
      options: {
        editProperties: ['amount', 'status'],
        properties: {
          status: {
            availableValues: [
              { value: 'pending', label: 'Pending' },
              { value: 'completed', label: 'Completed' },
              { value: 'failed', label: 'Failed' },
            ],
          },
        },
      },
    },
  ],
};
