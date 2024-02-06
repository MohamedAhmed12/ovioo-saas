import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ormConfig } from 'src/ormconfig';
import { Team } from 'src/team/team.entity';
import { User } from 'src/user/user.entity';
import { userFactory } from 'src/user/user.factory';
import { DataSource, Repository } from 'typeorm';
import { cleanupDatabase, setupDatabase } from '../../test/test-setup';
import { Project } from './project.entity';
import { ProjectModule } from './project.module';
import { ProjectService } from './project.service';
import { projectFactory } from './project.factory';

describe('ProjectService', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let projectService: ProjectService;
  let userRepository;
  let projectRepository;
  let teamRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ProjectModule,
        TypeOrmModule.forRoot(ormConfig()),
        TypeOrmModule.forFeature([Team]),
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    projectRepository = module.get(getRepositoryToken(Project));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    teamRepository = module.get(getRepositoryToken(Team));

    projectService = module.get<ProjectService>(ProjectService);
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

  it('projectService should be defined', () => {
    expect(ProjectService).toBeDefined();
  });

  describe('createProject', () => {
    it('should create project', async () => {
      // users
      const userData = await userFactory();
      const user = await userRepository.save(userData);

      // team
      const team = await teamRepository.create({ name: 'team one' });
      team.owner_id = user.id;
      team.members = [user];
      await teamRepository.save(team);

      const createdProject = await projectService.createProject(user, {
        title: 'First project',
        description: 'First project desc',
      });
      const projects = await projectRepository.find();

      expect(projects.length).toBe(1);
      expect(projects[0].id).toEqual(createdProject.id);
    });
  });

  describe('listProjects', () => {
    it('should create project', async () => {
      // users
      const userData = await userFactory();
      const user = await userRepository.save(userData);

      // team
      const team = await teamRepository.create({ name: 'team one' });
      team.owner_id = user.id;
      team.members = [user];
      await teamRepository.save(team);

      const firstProject = await projectFactory({
        team: team,
      });
      const secondProject = await projectFactory({
        team: team,
      });
      await projectRepository.save([firstProject, secondProject]);

      const projects = await projectService.listProjects(user);
      expect(projects.length).toBe(2);
    });
  });
});
