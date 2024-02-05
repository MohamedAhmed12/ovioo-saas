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

describe('ChatService', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let chatService: ChatService;
  let userRepository;
  let messageRepository;
  let teamRepository;
  let taskRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ChatModule, TypeOrmModule.forRoot(ormConfig())],
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

  describe('listUnreadMessages', () => {
    it('should return unread messages for all tasks', async () => {
      // users
      const userData = await userFactory();
      let user = await userRepository.save(userData);

      const accountManager = await userFactory({
        role: UserRoleEnum.AccountManager,
      });
      await userRepository.save(accountManager);

      // task
      const task1 = await taskFactory();
      const task2 = await taskFactory();
      await taskRepository.save([task1, task2]);

      // team
      const team = await teamRepository.create({
        name: 'team one',
        owner_id: user.id,
        members: [user, accountManager],
        tasks: [task1, task2],
      });
      await teamRepository.save(team);

      // messages
      const unreadMsg1 = await messageRepository.create({
        content: 'First message',
        sender_id: accountManager.id,
        sender: accountManager,
        task: task1,
      });
      const unreadMsg2 = await messageRepository.create({
        content: 'Second message',
        sender_id: accountManager.id,
        sender: accountManager,
        task: task2,
      });
      const readMsg = await messageRepository.create({
        content: 'Second message',
        sender_id: accountManager.id,
        sender: accountManager,
        task: task2,
        status: MessageStatusEnum.READ,
      });

      await messageRepository.save([unreadMsg1, unreadMsg2, readMsg]);

      user = await userRepository.findOneBy({ id: user.id });

      const tasks = await chatService.listUnreadMessages(user);

      expect(tasks.length).toBe(2);
      expect(tasks[0].messages.length).toBe(1);
      expect(tasks[0].messages[0].status).toEqual(MessageStatusEnum.SENT);
      expect(tasks[1].messages.length).toBe(1);
      expect(tasks[1].messages[0].status).toEqual(MessageStatusEnum.SENT);
    });
  });

  describe('receiveAllSentMessages', () => {
    it('should convert all unread msgs oter than auth user msgs to status received', async () => {
      const userData = await userFactory();
      let user = await userRepository.save(userData);

      const accountManager = await userFactory({
        role: UserRoleEnum.AccountManager,
      });
      await userRepository.save(accountManager);

      const task = await taskFactory();
      await taskRepository.save(task);

      const team = await teamRepository.create({ name: 'team one' });
      team.owner_id = user.id;
      team.members = [user, accountManager];
      team.tasks = [task];
      await teamRepository.save(team);

      let firstMsg = await messageRepository.create({
        content: 'First message',
        sender_id: accountManager.id,
        sender: accountManager,
        task: task,
      });
      await messageRepository.save(firstMsg);

      user = await userRepository.findOneBy({ id: user.id });

      await chatService.receiveAllSentMessages(user);

      firstMsg = await messageRepository.findOneBy({ id: firstMsg.id });

      expect(firstMsg.status).toBe(MessageStatusEnum.RECEIVED);
      expect(firstMsg.status).toBe(MessageStatusEnum.RECEIVED);
    });
  });
});
