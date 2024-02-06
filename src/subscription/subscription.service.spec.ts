import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ormConfig } from 'src/ormconfig';
import { Plan } from 'src/plan/plan.entity';
import { planFactory } from 'src/plan/plan.factory';
import { Team } from 'src/team/team.entity';
import { User } from 'src/user/user.entity';
import { userFactory } from 'src/user/user.factory';
import { DataSource, Repository } from 'typeorm';
import { cleanupDatabase, setupDatabase } from '../../test/test-setup';
import { OviooSubscription } from './subscription.entity';
import { SubscriptionModule } from './subscription.module';
import { SubscriptionService } from './subscription.service';

describe('SubscriptionService', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let subscriptionService: SubscriptionService;
  let subscriptionRepository;
  let userRepository;
  let planRepository;
  let teamRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SubscriptionModule,
        TypeOrmModule.forRoot(ormConfig()),
        TypeOrmModule.forFeature([User, Team]),
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    subscriptionRepository = module.get(getRepositoryToken(OviooSubscription));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    teamRepository = module.get<Repository<Team>>(getRepositoryToken(Team));
    planRepository = module.get<Repository<Plan>>(getRepositoryToken(Plan));

    subscriptionService = module.get<SubscriptionService>(SubscriptionService);
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

  it('subscriptionService should be defined', () => {
    expect(SubscriptionService).toBeDefined();
  });

  describe('createSubscription', () => {
    it('should create subscription', async () => {
      // user
      const userData = await userFactory();
      let user = await userRepository.save(userData);

      // team
      const team = await teamRepository.create({ name: 'team one' });
      team.owner_id = user.id;
      team.members = [user];
      await teamRepository.save(team);

      // plan
      let plan = await planFactory();
      plan = await planRepository.save(plan);

      user = await userRepository.findOneBy({ id: user.id });
      const createdSubscription = await subscriptionService.createSubscription(
        user,
        plan.id.toString(),
      );

      const subscriptions = await subscriptionRepository.find();

      expect(subscriptions.length).toBe(1);
      expect(subscriptions[0].id).toEqual(createdSubscription.id);
    });
  });
});
