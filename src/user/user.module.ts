import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profile/profile.entity';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { Team } from 'src/team/team.entity';
import { TeamService } from 'src/team/team.service';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    SubscriptionModule,
    TypeOrmModule.forFeature([User, Profile, Team]),
  ],
  providers: [UserResolver, UserService, TeamService],
})
export class UserModule {}
