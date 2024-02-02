import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ormConfig } from 'src/ormconfig';
import { Project } from 'src/project/project.entity';
import { projectFactory } from 'src/project/project.factory';
import { UserRoleEnum } from 'src/user/enums/user-role.enum';
import { userFactory } from 'src/user/user.factory';
import { DataSource, Repository } from 'typeorm';
import { cleanupDatabase, setupDatabase } from '../../test/test-setup';
import { Task } from '../task/task.entity';
import { Team } from '../team/team.entity';
import { User } from '../user/user.entity';
import { Asset } from './asset.entity';
import { AssetModule } from './asset.module';
import { AssetService } from './asset.service';

describe('AssetService', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let assetService: AssetService;
  let userRepository;
  let teamRepository;
  let projectRepository;
  let assetRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AssetModule,
        TypeOrmModule.forRoot(ormConfig()),
        TypeOrmModule.forFeature([User, Project]),
      ],
      providers: [
        AssetService,
        {
          provide: getRepositoryToken(Asset),
          useClass: Repository,
        },
        // {
        //   provide: getRepositoryToken(User),
        //   useClass: Repository,
        // },
        {
          provide: getRepositoryToken(Team),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    userRepository = module.get(getRepositoryToken(User));
    teamRepository = module.get(getRepositoryToken(Team));
    projectRepository = module.get(getRepositoryToken(Project));
    assetRepository = module.get(getRepositoryToken(Asset));

    assetService = module.get<AssetService>(AssetService);
  });

  beforeEach(async () => {
    dataSource = await setupDatabase(app);
  });
  afterEach(async () => {
    // await cleanupDatabase(dataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  it('assetService should be defined', () => {
    expect(assetService).toBeDefined();
  });

  describe('listAssets', () => {
    it('should list assets for all projects of user attached team', async () => {
      const projectOne = await projectFactory();
      const projectTwo = await projectFactory();
      projectRepository.save([projectOne, projectTwo]);

      const assetOne = await assetRepository.create({
        src: 'assetone.png',
        type: 'png',
      });
      assetOne.project = projectOne;
      const assetTwo = await assetRepository.create({
        src: 'assetone.png',
        type: 'png',
      });
      assetTwo.project = projectTwo;
      assetRepository.save([assetOne, assetTwo]);

      const user = await userFactory({ role: UserRoleEnum.AccountManager });
      await userRepository.save(user);

      let team = await teamRepository.create({ title: 'team one' });
      team.owner_id = user.id;
      team.projects = [projectOne, projectTwo];
      team = await teamRepository.save(team);
      user.teams = [team];
      const UserObject: User = await userRepository.save(user);

      const assets = await assetService.listAssets(UserObject);

      expect(assets.length).toBe(2);
    });

    it('should list assets for specific project', async () => {
      const projectOne = await projectFactory();
      const projectTwo = await projectFactory();
      projectRepository.save([projectOne, projectTwo]);

      const assetOne = await assetRepository.create({
        src: 'assetone.png',
        type: 'png',
      });
      assetOne.project = projectOne;
      const assetTwo = await assetRepository.create({
        src: 'assetone.png',
        type: 'png',
      });
      assetTwo.project = projectTwo;
      assetRepository.save([assetOne, assetTwo]);

      const user = await userFactory({ role: UserRoleEnum.AccountManager });
      await userRepository.save(user);

      let team = await teamRepository.create({ title: 'team one' });
      team.owner_id = user.id;
      team.projects = [projectOne, projectTwo];
      team = await teamRepository.save(team);
      user.teams = [team];
      const UserObject: User = await userRepository.save(user);

      const assets = await assetService.listAssets(UserObject, projectOne.id);

      expect(assets.length).toBe(1);
      expect(assets[0].id).toEqual(assetOne.id);
    });
  });
});
