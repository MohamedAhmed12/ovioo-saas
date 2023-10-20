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
    return await authUser.team.tasks;
  }

  async showTask(authUser: User, id: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: +id });
    const taskTeam = await task.team;

    if (!task)
      throw new NotFoundException('Couldn’t find task matches this id.');

    if (taskTeam.id != authUser.team.id)
      throw new UnauthorizedException('You are not allowed to view this task.');

    return task;
  }

  async createTask(data: CreateTaskDto): Promise<Task> {
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
    task.team = project.team;
    task.type = type;
    return await this.taskRepository.save(task);
  }

  async updateTask(data: UpdateTaskDto): Promise<Task> {
    let task = await this.taskRepository.findOne({
      where: {
        id: data.id,
      },
      relations: ['project'],
    });

    if (!task) throw new NotFoundException('Couldn’t find task matches id.');

    if (data.type_id && data.type_id != task?.type?.id) {
      task.type = await this.taskTypeRepository.findOneByOrFail({
        id: data.type_id,
      });
    }
    if (data.project_id && data.project_id != task?.project?.id) {
      task.project = await this.projectRepository.findOneByOrFail({
        id: data.project_id,
      });
    }
    if (data.designer_id && data.designer_id != task?.designer?.id) {
      task.designer = await this.userRepository.findOneByOrFail({
        id: data.designer_id,
      });
    }

    task = await this.taskRepository.merge(task, {
      title: data.title,
      description: data.description,
      status: data.status,
    });

    return await this.taskRepository.save(task);
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
