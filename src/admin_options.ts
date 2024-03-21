import { DesignerTransaction } from './designerTransaction /designerTransaction.entity';
import { Project } from './project/project.entity';
import { TaskType } from './task/task-type.entity';
import { Task } from './task/task.entity';
import { Team } from './team/team.entity';
import { User } from './user/user.entity';

const DEFAULT_ADMIN = {
  email: process.env.ADMIN_JS_EMAIL,
  password: process.env.ADMIN_JS_PASSWORD,
};
//  test pipelines
const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

export const adminJSConfig = {
  adminJsOptions: {
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
          editProperties: ['amount', 'status', 'designerId'],
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
  },
  auth: {
    authenticate,
    cookieName: 'adminjs',
    cookiePassword: 'secret',
  },
  sessionOptions: {
    resave: true,
    saveUninitialized: true,
    secret: process.env.ADMIN_JS_SECRET,
  },
};
