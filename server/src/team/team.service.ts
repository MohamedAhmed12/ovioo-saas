import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuardUserDto } from 'src/user/dto/auth-guard-user.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Team } from './team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getTeam({ email, provider }: AuthGuardUserDto): Promise<Team> {
    const user = await this.userRepository.findOne({
      where: {
        email,
        provider,
      },
      relations: ['team.users'],
    });

    const ownerIndex = user.team.users.findIndex(
      (owner: User) => owner.id == user.id,
    );
    const owner = user.team.users[+ownerIndex];
    user.team.users.splice(+ownerIndex, 1);
    user.team.users.unshift(owner);

    return user.team;
  }
}
