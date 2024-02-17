import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeService } from 'src/subscription/stripe.service';
import { User } from 'src/user/user.entity';
import { Team } from './team.entity';
import { TeamResolver } from './team.resolver';
import { TeamService } from './team.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Team])],
  providers: [TeamResolver, TeamService, StripeService],
})
export class TeamModule {}
