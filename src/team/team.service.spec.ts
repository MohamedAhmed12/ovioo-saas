import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ormConfig } from 'src/ormconfig';
import { User } from 'src/user/user.entity';
import { userFactory } from 'src/user/user.factory';
import { DataSource, Repository } from 'typeorm';
import { cleanupDatabase, setupDatabase } from '../../test/test-setup';
import { Team } from './team.entity';
import { TeamModule } from './team.module';
import { TeamService } from './team.service';

describe('TeamService', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let teamService: TeamService;
  let userRepository;
  let teamRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TeamModule, TypeOrmModule.forRoot(ormConfig())],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    teamRepository = module.get(getRepositoryToken(Team));

    teamService = module.get<TeamService>(TeamService);
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

  it('teamService should be defined', () => {
    expect(TeamService).toBeDefined();
  });

  describe('getUserTeam', () => {
    it('should team for normal users with role user', async () => {
      // users
      const userData = await userFactory();
      const user = await userRepository.save(userData);

      // team
      let team = await teamRepository.create({
        name: 'team one',
        owner_id: user.id,
        members: [user],
      });
      team = await teamRepository.save(team);

      const responseTeam = await teamService.getUserTeam(user);

      expect(responseTeam.id).toEqual(team.id);
    });
  });

  describe('transferOwnership', () => {
    it('should be able to transfer ownership from member to another', async () => {
      // users
      const firstUserData = await userFactory();
      const firstUser = await userRepository.save(firstUserData);
      const secondUserData = await userFactory();
      const secondUser = await userRepository.save(secondUserData);

      // team
      let team = await teamRepository.create({
        name: 'team one',
        owner_id: firstUser.id,
        members: [firstUser, secondUser],
      });
      await teamRepository.save(team);

      await teamService.transferOwnership('2', firstUser);
      team = await teamRepository.findOneBy({ id: team.id });

      expect(team.owner_id).toEqual(secondUser.id);
    });
  });
});
