import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Asset } from 'src/asset/asset.entity';
import { AssetService } from 'src/asset/asset.service';
import { ormConfig } from 'src/ormconfig';
import { Project } from 'src/project/project.entity';
import { Team } from 'src/team/team.entity';
import { UserRoleEnum } from 'src/user/enums/user-role.enum';
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

describe('TaskService', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let taskService: TaskService;
  let userRepository;
  let taskRepository;
  let teamRepository;

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
    teamRepository = module.get(getRepositoryToken(Team));

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

  describe('listTasks', () => {
    it('should list all tasks for user related teams', async () => {
      // task
      const firstTask = await taskFactory();
      const secondTask = await taskFactory();

      // team
      let team1 = await teamRepository.create({
        name: 'team one',
        owner_id: 1,
        tasks: [firstTask],
      });
      team1 = await teamRepository.save(team1);

      let team2 = await teamRepository.create({
        name: 'team two',
        owner_id: 1,
        tasks: [secondTask],
      });
      team2 = await teamRepository.save(team2);

      // user
      const userData = await userFactory();
      userData.teams = [team1, team2];
      const user = await userRepository.save(userData);

      const tasks = await taskService.listTasks(user);

      expect(tasks.length).toBe(2);
    });
  });

  describe('showTask', () => {
    it('should show task for task team members', async () => {
      // task
      const firstTask = await taskFactory();

      // team
      let team1 = await teamRepository.create({
        name: 'team one',
        owner_id: 1,
        tasks: [firstTask],
      });
      team1 = await teamRepository.save(team1);
      const team1Task = await team1.tasks;

      let team2 = await teamRepository.create({
        name: 'team two',
        owner_id: 1,
      });
      team2 = await teamRepository.save(team2);

      // user
      const userData = await userFactory();
      userData.teams = [team1, team2];
      const user = await userRepository.save(userData);

      const task = await taskService.showTask(user, team1Task[0].id);

      expect(task.id).toEqual(team1Task[0].id);
    });
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
