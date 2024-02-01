import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Asset } from 'src/asset/asset.entity';
import { AssetService } from 'src/asset/asset.service';
import { ormConfig } from 'src/ormconfig';
import { Project } from 'src/project/project.entity';
import { Team } from 'src/team/team.entity';
import { User } from 'src/user/user.entity';
import { userFactory } from 'src/user/user.factory';
import { DataSource, Repository } from 'typeorm';
import { cleanupDatabase, setupDatabase } from '../../test/test-setup';
import { TaskStatusEnum } from './enums/task-status.enum';
import { TaskType } from './task-type.entity';
import { Task } from './task.entity';
import { taskFactory } from './task.factory';
import { TaskModule } from './task.module';
import { TaskService } from './task.service';
import { UserRoleEnum } from 'src/user/enums/user-role.enum';

describe('TaskService', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let taskService: TaskService;
  let userRepository;
  let taskRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TaskModule, TypeOrmModule.forRoot(ormConfig())],
      providers: [
        TaskService,
        AssetService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(TaskType),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Project),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Asset),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Team),
          useClass: Repository,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    userRepository = module.get(getRepositoryToken(User));
    taskRepository = module.get(getRepositoryToken(Task));

    taskService = module.get<TaskService>(TaskService);
  });

  beforeEach(async () => {
    dataSource = await setupDatabase(app);
  });
  afterEach(async () => {
    await cleanupDatabase(dataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  it('taskService should be defined', () => {
    expect(taskService).toBeDefined();
  });

  describe('findIdleDesigner', () => {
    it('should only apply on users with designer role', async () => {
      const user = await userFactory({ role: UserRoleEnum.User });
      await userRepository.save(user);

      const [designerWithDoneTasks] = await createDesignerWithTask({
        status: TaskStatusEnum.DONE,
      });

      const idleDesigne = await taskService.findIdleDesigner();

      expect(idleDesigne).toEqual(designerWithDoneTasks);
    });

    it('should return new designer with no prev tasks', async () => {
      let designerWithNoTasks = await userFactory({
        role: UserRoleEnum.Designer,
      });
      designerWithNoTasks = await userRepository.save(designerWithNoTasks);

      const [designerWithDoneTasks] = await createDesignerWithTask({
        status: TaskStatusEnum.DONE,
      });

      const idleDesigne = await taskService.findIdleDesigner();

      expect(idleDesigne).toEqual(designerWithNoTasks);
    });

    it('should return idle designer', async () => {
      const [idleDesigner] = await createDesignerWithTask({
        status: TaskStatusEnum.DONE,
      });
      const [busyDesigner] = await createDesignerWithTask({
        status: TaskStatusEnum.IN_PROGRESS,
      });

      // assign old Done task to the busy designer
      const oldDoneTask = await taskFactory({ status: TaskStatusEnum.DONE });
      const updated_at = new Date();
      updated_at.setMonth(updated_at.getMonth() - 1);
      oldDoneTask.updated_at = updated_at;
      oldDoneTask.designer = busyDesigner;
      await taskRepository.save(oldDoneTask);

      const idleDesigne = await taskService.findIdleDesigner();

      expect(idleDesigne).toEqual(idleDesigner);
    });

    it('should return designer with the longest idle time', async () => {
      const oldUpdatedAtDate = new Date();
      oldUpdatedAtDate.setMonth(oldUpdatedAtDate.getMonth() - 1);

      const [longestIdleDesigner] = await createDesignerWithTask({
        status: TaskStatusEnum.DONE,
        updated_at: oldUpdatedAtDate,
      });
      const [lessIdleDesigner] = await createDesignerWithTask({
        status: TaskStatusEnum.DONE,
      });

      const idleDesigne = await taskService.findIdleDesigner();

      expect(idleDesigne).toEqual(longestIdleDesigner);
    });

    it('should return designer with the older task if no one is idle', async () => {
      const oldUpdatedAtDate = new Date();
      oldUpdatedAtDate.setMonth(oldUpdatedAtDate.getMonth() - 1);

      const [olderAssignedDesigner] = await createDesignerWithTask({
        status: TaskStatusEnum.IN_PROGRESS,
        updated_at: oldUpdatedAtDate,
      });
      const [newerAssignedDesigner] = await createDesignerWithTask({
        status: TaskStatusEnum.IN_PROGRESS,
      });

      const idleDesigne = await taskService.findIdleDesigner();

      expect(idleDesigne).toEqual(olderAssignedDesigner);
    });
  });

  async function createDesignerWithTask(
    taskData: Partial<Task>,
    existedUserId?: number,
  ) {
    let designer;

    if (existedUserId) {
      designer = await userRepository.findOneBy({ id: existedUserId });
    } else {
      designer = await userFactory({ role: UserRoleEnum.Designer });
      designer = await userRepository.save(designer);
    }

    let task = await taskFactory(taskData);
    task.designer = designer;
    task = await taskRepository.save(task);

    return [designer, task];
  }
});
