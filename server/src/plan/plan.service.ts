import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './plan.entity';

import fs from 'fs';
@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  async listPlans(): Promise<Plan[]> {
    // Specify the file path and content
   
console.log(2222222222);

    return await this.planRepository.find();
  }
}
