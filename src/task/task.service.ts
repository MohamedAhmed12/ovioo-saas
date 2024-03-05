import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { AssetService } from 'src/asset/asset.service';
import { NotificationService } from 'src/notification/notification.service';
import { Project } from 'src/project/project.entity';
import { UserRoleEnum } from 'src/user/enums/user-role.enum';
import { User } from 'src/user/user.entity';
import { Brackets, In, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatusEnum } from './enums/task-status.enum';
import { TaskType } from './task-type.entity';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TaskType)
    private readonly taskTypeRepository: Repository<TaskType>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly assetService: AssetService,
    private readonly notificationService: NotificationService,
  ) {}

  async listTaskTypes(): Promise<TaskType[]> {
    return await this.taskTypeRepository.find();
  }

  async listTasks(authUser: User): Promise<Task[]> {
    return await this.taskRepository.find({
      where: {
        team: { id: In(authUser.teams.map((team) => team.id)) },
      },
      relations: ['subtasks'],
    });
  }

  async showTask(authUser: User, id: string): Promise<Task> {
    const task = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.type', 'type')
      .leftJoinAndSelect('task.team', 'team')
      .leftJoinAndSelect('team.members', 'member')
      .where('task.id = :id', { id: +id })
      .getOne();
    const taskTeam = await task.team;

    if (!task)
      throw new NotFoundException('Couldn’t find task matches this id.');

    if (!authUser.teams.some((team) => team.id == taskTeam.id))
      throw new UnauthorizedException('You are not allowed to view this task.');

    return task;
  }

  async findIdleDesigner(): Promise<User> {
    /* get designer which has no assigned tasks
     * or the earliest one to finishe all his tasks(the one who spent most idle time)
     * or if all users is busy the earliest one got assigned to a task
     */
    return await this.userRepository
      .createQueryBuilder('users')
      .leftJoin('users.assignedTasks', 'task')
      .addOrderBy('COALESCE(MAX(task.updated_at), :defaultDate)', 'ASC') // COALESCE is to handle the null tasks cases it put updated_at = 0
      .setParameter('defaultDate', new Date(0)) // A default date for users without tasks
      .where('users.role = :role', { role: UserRoleEnum.Designer })
      .andWhere(
        new Brackets((query) => {
          query
            .where('task.id IS NULL')
            .orWhere(
              `NOT EXISTS (SELECT 1 FROM tasks WHERE tasks."designerId" = users.id AND tasks.status != '${TaskStatusEnum.DONE}')`,
            )
            .orWhere('task.id IS NOT NULL');
        }),
      )
      .groupBy('users.id')
      .getOne();
  }

  async createTask(data: CreateTaskDto, authUser: User): Promise<Task> {
    const type = await this.taskTypeRepository.findOneBy({ id: data.type_id });

    if (!type)
      throw new GraphQLError('Couldn’t find the selected type', {
        extensions: {
          originalError: {
            message: [{ type: 'Couldn’t find the selected type' }],
          },
        },
      });

    const idleDesigner = await this.findIdleDesigner();

    const task = await this.taskRepository.create(data);
    task.team = authUser.teams[0];
    task.type = type;
    task.designer = idleDesigner;
    return await this.taskRepository.save(task);
  }

  async updateTask(authUser: User, data: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        id: data.id,
      },
    });

    if (!task) throw new NotFoundException('Couldn’t find task matches id.');
    if (task.status == TaskStatusEnum.DONE)
      throw new ForbiddenException('You Can’t update done task.');

    const fields = ['title', 'description', 'status'];
    fields.forEach((field) => {
      if (data[field] && data[field] !== task[field]) {
        this.notificationService.sendNotification({
          content: `Changed ${field} from ${task[field]} to ${data[field]}.`,
          action: '',
          userId: authUser.id,
        });
        task[field] = data[field];
      }
    });

    await this.taskRepository.update(task.id, data);
    return task;
  }

  async deleteTask(id: string): Promise<boolean> {
    const task = await this.taskRepository.findOneBy({ id: +id });
    const assets = task.assets;
    const isTaskDeleted = await this.taskRepository.delete(id);

    if (isTaskDeleted.affected) {
      assets.forEach((asset) => {
        this.assetService.deleteAsset(asset);
      });
      return true;
    }

    return false;
  }
}
