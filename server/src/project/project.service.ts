import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuardUserDto } from 'src/user/dto/auth-guard-user.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createProject(
    { email, provider }: AuthGuardUserDto,
    data: CreateProjectDto,
  ): Promise<Project> {
    const authUser = await this.userRepository.findOne({
      where: {
        email,
        provider,
      },
      relations: ['team'],
    });

    if (!authUser) throw new ForbiddenException('Not allowed');

    const project = this.projectRepository.create({
      ...data,
      team: authUser.team,
    });

    return await this.projectRepository.save(project);
  }
}
