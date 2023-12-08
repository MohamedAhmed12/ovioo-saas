import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Plan } from './plan.entity';
import { PlanResolver } from './plan.resolver';
import { PlanService } from './plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Plan])],
  providers: [PlanResolver, PlanService],
})
export class PlanModule {}
