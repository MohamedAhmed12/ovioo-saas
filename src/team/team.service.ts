import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuardUserDto } from 'src/user/dto/auth-guard-user.dto';
import { UserRoleEnum } from 'src/user/enums/user-role.enum';
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

  async createTeam(owner_id: number) {
    const idleAccountManager = await this.findIdleAccountManager();
    const team = await this.teamRepository.create({
      owner_id,
    });

    if (idleAccountManager) team.members = [idleAccountManager];

    return team;
  }

  async deleteTeam(id: number) {
    const res = await this.teamRepository
      .createQueryBuilder('users_teams_teams')
      .delete()
      .from('users_teams_teams')
      .where('teamsId = :teamId', { teamId: id })
      .execute();
    console.log(res);

    return true;
  }

  async getUserTeam({ email }: AuthGuardUserDto): Promise<Team> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['teams.members'],
    });
    const userTeam = user.teams[0];

    // move team owner to first index of members array
    const ownerIndex = userTeam.members.findIndex(
      (member: User) => member.id == userTeam.owner_id,
    );
    const owner = userTeam.members[+ownerIndex];
    userTeam.members.splice(+ownerIndex, 1);
    userTeam.members.unshift(owner);

    return userTeam;
  }

  async transferOwnership(
    memberId: string,
    { email, provider }: { email: string; provider: string },
  ): Promise<boolean> {
    const authUser = await this.userRepository.findOne({
      where: {
        email,
        provider,
      },
      relations: ['teams.members'],
    });
    const authUserTeam = authUser.teams[0];

    if (
      authUser.id != authUserTeam.owner_id &&
      authUser.role == UserRoleEnum.User
    )
      throw new ForbiddenException('Not allowed');

    let memberIndex = -1;

    authUserTeam.members.map((user, i) => {
      if (user.id === +memberId) {
        user.role = UserRoleEnum.User;
        memberIndex = i;
      } else {
        user.role = UserRoleEnum.Member;
      }
    });

    if (memberIndex == -1)
      throw new NotFoundException('Couldn’t find team member matches this id.');

    this.userRepository.save(authUserTeam.members);

    authUserTeam.owner_id = +memberId;
    await this.teamRepository.save(authUserTeam);

    return true;
  }

  async findIdleAccountManager(): Promise<User> {
    //get AccountManager with less teams
    return await this.userRepository
      .createQueryBuilder('users')
      .leftJoin('users.teams', 'teams')
      .where('users.role = :role', { role: UserRoleEnum.AccountManager })
      .groupBy('users.id')
      .orderBy('COUNT(teams.id)', 'ASC')
      .getOne();
  }
}
