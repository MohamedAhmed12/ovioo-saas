import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { AssetService } from 'src/asset/asset.service';
import { Task } from 'src/task/task.entity';
import { User } from 'src/user/user.entity';
import { ArrayContains, In, Not, Repository } from 'typeorm';
import { ListMessageDto } from './dto/list-message.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageStatusEnum } from './enum/message-status.enum';
import { Message } from './message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly assetService: AssetService,
  ) {}

  async listMessages(
    authUser: User,
    { page, offsetPlus = 0, limit = 10, task_id }: ListMessageDto,
  ): Promise<Message[]> {
    let messages: Message[];

    if (page == 1) {
      messages = await this.listUnreadMessages(authUser, task_id);
      if (messages.length >= 10) {
        return messages.reverse();
      }
    }

    const offset = (page - 1) * limit + offsetPlus;
    messages = await this.messageRepository
      .createQueryBuilder('messages')
      .select('messages')
      .addSelect([
        'sender.id',
        'sender.fullname',
        'sender.avatar',
        'sender.role',
        'asset.src',
        'asset.type',
        'asset.alt',
      ])
      .leftJoin('messages.task', 'task')
      .leftJoin('messages.sender', 'sender')
      .leftJoin('messages.asset', 'asset')
      .where(`task.id = ${task_id}`)
      .orderBy('messages.created_at', 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();

    return messages.reverse();
  }

  private async listUnreadMessages(
    authUser: User,
    task_id: number,
  ): Promise<Message[]> {
    return await this.messageRepository
      .createQueryBuilder('messages')
      .select('messages')
      .addSelect([
        'sender.id',
        'sender.fullname',
        'sender.avatar',
        'sender.role',
        'asset.src',
        'asset.type',
        'asset.alt',
      ])
      .leftJoin('messages.task', 'task')
      .leftJoin('messages.sender', 'sender')
      .leftJoin('messages.asset', 'asset')
      .where(
        `task.id = ${task_id} AND sender_id != '${authUser.id}' AND (messages.status != '${MessageStatusEnum.READ}' OR (messages.status = '${MessageStatusEnum.READ}' AND ' ${authUser.fullname}' != ANY(messages.read_by)))`,
      )
      .orderBy('messages.created_at', 'DESC')
      .getMany();
  }

  async listTaskUnreadMessages(authUser: User): Promise<Task[]> {
    const tasks = await this.taskRepository
      .createQueryBuilder('task')
      .select('task')
      .addSelect(['sender.fullname', 'sender.avatar'])
      .leftJoinAndSelect(
        'task.messages',
        'message',
        `message.sender_id != '${authUser.id}' AND (message.status != '${MessageStatusEnum.READ}' OR (message.status = '${MessageStatusEnum.READ}' AND ' ${authUser.fullname}' != ANY(message.read_by)))`,
      )
      .leftJoin('message.sender', 'sender')
      .loadRelationCountAndMap(
        'task.unreadMessagesCount',
        'task.messages',
        'unreadMessagesCount',
        (subQuery) =>
          subQuery.where(
            `sender_id != '${authUser.id}' AND (status != '${MessageStatusEnum.READ}' OR (status = '${MessageStatusEnum.READ}' AND ' ${authUser.fullname}' != ANY(read_by)))`,
          ),
      )
      .where('task.teamId = :teamId', { teamId: authUser.team.id })
      .orderBy('message.created_at', 'DESC')
      .getMany();

    return tasks.filter((task) => {
      if (task?.messages && task?.messages?.length == 0) return;

      task.messages = [task.messages[0]];
      return task;
    });
  }

  async sendMessage(authUser: User, data: SendMessageDto): Promise<Message> {
    const msg = await this.messageRepository.create(data);
    msg.task = await this.getMsgTask(data.task_id);
    msg.sender = await this.getMsgSender(authUser.id);

    return await this.messageRepository.save(msg);
  }

  private async getMsgSender(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  private async getMsgTask(id: number) {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task)
      throw new GraphQLError('Couldn’t find task matches this id', {
        extensions: {
          originalError: {
            message: [{ type: 'Couldn’t find task matches this id' }],
          },
        },
      });

    return task;
  }

  async updateMessage(data: UpdateMessageDto): Promise<boolean> {
    const message = await this.messageRepository.findOneBy({ id: data.id });
    if (!message)
      throw new NotFoundException('Couldn’t find message matches id');

    await this.messageRepository.merge(message, data);
    const messageUpdated = await this.messageRepository.update(
      message.id,
      message,
    );

    return !!messageUpdated.affected;
  }

  async receiveAllSentMessages(authUser: User): Promise<boolean> {
    const messages = await this.messageRepository.find({
      where: {
        task: {
          team: {
            id: authUser.team.id,
          },
        },
      },
    });
    messages.map((message) => {
      if (message.sender.id == authUser.id) return message;

      message.status = MessageStatusEnum.RECEIVED;
      if (!message.received_by.includes(` ${authUser.fullname}`)) {
        message.received_by.push(` ${authUser.fullname}`);
      }

      return message;
    });
    await this.messageRepository.save(messages);

    return true;
  }

  async changeTaskMessagesStatus(
    authUser: User,
    taskId: string,
    status: MessageStatusEnum,
    excludeStatuses: MessageStatusEnum[],
  ): Promise<Message[]> {
    const messages = await this.messageRepository.find({
      where: [
        {
          status: Not(In(excludeStatuses)),
          task: {
            id: +taskId,
          },
          sender: {
            id: Not(authUser.id),
          },
        },
        {
          status: status,
          [`${status}_by`]: Not(ArrayContains([` ${authUser.fullname}`])),
          task: {
            id: +taskId,
          },
          sender: {
            id: Not(authUser.id),
          },
        },
      ],
    });

    messages.map((message) => {
      return this.changeMessageStatus(message, authUser, status);
    });

    return await this.messageRepository.save(messages);
  }

  private changeMessageStatus(
    message: Message,
    authUser: User,
    status: MessageStatusEnum,
  ): Message {
    message.status = status;
    if (!message[`${status}_by`].includes(` ${authUser.fullname}`)) {
      message[`${status}_by`].push(` ${authUser.fullname}`);
    }

    return message;
  }
}
