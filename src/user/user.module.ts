import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profile/profile.entity';
import { StripeService } from 'src/subscription/stripe.service';
import { Team } from 'src/team/team.entity';
import { TeamService } from 'src/team/team.service';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Team])],
  providers: [UserResolver, UserService, TeamService, StripeService],
})
export class UserModule {}
