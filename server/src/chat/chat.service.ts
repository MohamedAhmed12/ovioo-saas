import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { AssetService } from 'src/asset/asset.service';
import { Task } from 'src/task/task.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ListMessageDto } from './dto/list-message.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
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

  async listMessages({
    page,
    offsetPlus = 0,
    limit = 10,
    task_id,
  }: ListMessageDto): Promise<Message[]> {
    const offset = (page - 1) * limit + offsetPlus;
    const messages = await this.messageRepository
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
      .where('task.id = :task_id', { task_id })
      .orderBy('messages.created_at', 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();

    return messages.reverse();
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
}
