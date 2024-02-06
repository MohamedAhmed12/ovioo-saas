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
import { UserRoleEnum } from 'src/user/enums/user-role.enum';

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

  describe('createTeam', () => {
    it('should return account manager with lowest number of teams', async () => {
      // account managers
      const accountManager1 = await userFactory({
        role: UserRoleEnum.AccountManager,
      });
      const accountManager2 = await userFactory({
        role: UserRoleEnum.AccountManager,
      });
      await userRepository.save([accountManager1, accountManager2]);

      // team
      const team1 = await teamRepository.create({
        name: 'team one',
        owner_id: accountManager1.id,
        members: [accountManager1, accountManager2],
      });
      const team2 = await teamRepository.create({
        name: 'team two',
        owner_id: accountManager1.id,
        members: [accountManager1],
      });
      await teamRepository.save([team1, team2]);

      // it doesnt matter which id to pass in this case
      const team = await teamService.createTeam(accountManager2.id);

      expect(team.members.length).toBe(1);
      expect(team.members[0].id).toEqual(accountManager2.id);
    });

    it('should return single account manager if all of them have same amount of teams', async () => {
      // account managers
      const accountManager1 = await userFactory({
        role: UserRoleEnum.AccountManager,
      });
      const accountManager2 = await userFactory({
        role: UserRoleEnum.AccountManager,
      });
      await userRepository.save([accountManager1, accountManager2]);

      // team
      const team1 = await teamRepository.create({
        name: 'team one',
        owner_id: accountManager1.id,
        members: [accountManager1],
      });
      const team2 = await teamRepository.create({
        name: 'team two',
        owner_id: accountManager2.id,
        members: [accountManager2],
      });
      await teamRepository.save([team1, team2]);

      // it doesnt matter which id to pass in this case
      const team = await teamService.createTeam(accountManager1.id);

      expect(team.members.length).toBe(1);
      expect(team.members[0].id).toEqual(accountManager1.id);
    });

    it('should not break if there is not account manager in the system', async () => {
      // account managers
      const placeHolder = await userFactory({
        role: UserRoleEnum.User,
      });

      // it doesnt matter which id to pass in this case
      const team = await teamService.createTeam(placeHolder.id);

      expect(team.members.length).toBe(0);
    });
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
