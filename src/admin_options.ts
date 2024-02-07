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
    User
  ],
};
