import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { AssetService } from 'src/asset/asset.service';
import { Project } from 'src/project/project.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
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
  ) {}

  async listTaskTypes(): Promise<TaskType[]> {
    return await this.taskTypeRepository.find();
  }

  async listTasks(authUser: User): Promise<Task[]> {
    const team = await authUser.team;

    return this.taskRepository.find({
      where: {
        team: { id: team.id },
      },
      relations: ['subtasks'],
    });
  }

  async showTask(authUser: User, id: string): Promise<Task> {
    const task = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.type', 'type')
      .leftJoinAndSelect('task.team', 'team')
      .leftJoinAndSelect('team.members', 'member', 'member.isActive = TRUE')
      .where('task.id = :id', { id: +id })
      .getOne();
    const taskTeam = await task.team;

    if (!task)
      throw new NotFoundException('Couldn’t find task matches this id.');

    if (taskTeam.id != authUser.team.id)
      throw new UnauthorizedException('You are not allowed to view this task.');

    return task;
  }

  async createTask(data: CreateTaskDto, authUser: User): Promise<Task> {
    const Allprojects = await this.projectRepository.find();

    if (Allprojects.length === 0)
      throw new NotFoundException(
        'Please create a project to be able to create a task.',
      );

    const project = await this.projectRepository.findOne({
      where: {
        id: data.project_id,
      },
      relations: ['team'],
    });

    if (!project)
      throw new GraphQLError('Couldn’t find the selected project', {
        extensions: {
          originalError: {
            message: [{ project: 'Couldn’t find the selected project' }],
          },
        },
      });

    const type = await this.taskTypeRepository.findOneBy({ id: data.type_id });

    if (!type)
      throw new GraphQLError('Couldn’t find the selected type', {
        extensions: {
          originalError: {
            message: [{ type: 'Couldn’t find the selected type' }],
          },
        },
      });

    const task = await this.taskRepository.create(data);
    task.project = project;
    task.team = authUser.team;
    task.type = type;
    return await this.taskRepository.save(task);
  }

  async updateTask(data: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        id: data.id,
      },
      relations: ['project'],
    });

    if (!task) throw new NotFoundException('Couldn’t find task matches id.');

    await this.taskRepository
      .createQueryBuilder()
      .update(task)
      .set(data)
      .where('id = :id', { id: task.id })
      .execute();

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
