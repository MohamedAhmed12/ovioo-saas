import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { Project } from 'src/project/project.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { AuthGuardUserDto } from 'src/user/dto/auth-guard-user.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async listTasks({ email, provider }: AuthGuardUserDto): Promise<Task[]> {
    const authUser = await this.userRepository.findOne({
      where: {
        email,
        provider,
      },
      relations: ['team.tasks'],
    });

    return authUser.team.tasks;
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

    const task = await this.taskRepository.create(data);
    task.project = project;
    task.team = project.team;
    return await this.taskRepository.save(task);
  }
}
