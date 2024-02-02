import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ormConfig } from 'src/ormconfig';
import { Task } from 'src/task/task.entity';
import { taskFactory } from 'src/task/task.factory';
import { Team } from 'src/team/team.entity';
import { UserRoleEnum } from 'src/user/enums/user-role.enum';
import { User } from 'src/user/user.entity';
import { userFactory } from 'src/user/user.factory';
import { DataSource, Repository } from 'typeorm';
import { cleanupDatabase, setupDatabase } from '../../test/test-setup';
import { ChatModule } from './chat.module';
import { ChatService } from './chat.service';
import { MessageStatusEnum } from './enum/message-status.enum';
import { Message } from './message.entity';

describe('AssetService', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let chatService: ChatService;
  let userRepository;
  let messageRepository;
  let teamRepository;
  let taskRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ChatModule,
        TypeOrmModule.forRoot(ormConfig()),
        // TypeOrmModule.forFeature([User, Project]),
      ],
      providers: [
        // {
        //   provide: getRepositoryToken(Asset),
        //   useClass: Repository,
        // },
        // {
        //   provide: getRepositoryToken(Team),
        //   useClass: Repository,
        // },
        // {
        //   provide: getRepositoryToken(Task),
        //   useClass: Repository,
        // },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    messageRepository = module.get<Repository<Message>>(
      getRepositoryToken(Message),
    );
    teamRepository = module.get(getRepositoryToken(Team));
    taskRepository = module.get(getRepositoryToken(Task));

    chatService = module.get<ChatService>(ChatService);
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

  it('chatService should be defined', () => {
    expect(chatService).toBeDefined();
  });

  describe('listTaskUnreadMessages', () => {
    it('should return task unread messages', async () => {
      // users
      const userData = await userFactory();
      let user = await userRepository.save(userData);

      const accountManager = await userFactory({
        role: UserRoleEnum.AccountManager,
      });
      await userRepository.save(accountManager);

      // task
      const task = await taskFactory();
      await taskRepository.save(task);

      // team
      const team = await teamRepository.create({ name: 'team one' });
      team.owner_id = user.id;
      team.members = [user, accountManager];
      team.tasks = [task];
      await teamRepository.save(team);

      // messages
      const firstMsg = await messageRepository.create({
        content: 'First message',
        sender_id: accountManager.id,
        sender: accountManager,
        task: task,
      });
      const secondMsg = await messageRepository.create({
        content: 'Second message',
        sender_id: accountManager.id,
        sender: accountManager,
        task: task,
      });

      await messageRepository.save([firstMsg, secondMsg]);

      user = await userRepository.findOneBy({ id: user.id });
      const tasks = await chatService.listTaskUnreadMessages(user);

      expect(tasks[0].messages.length).toBe(2);
      expect(tasks[0].messages.map((msg) => msg.status)).toEqual([
        MessageStatusEnum.SENT,
        MessageStatusEnum.SENT,
      ]);
    });
  });


});
