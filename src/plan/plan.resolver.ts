import { Query, Resolver } from '@nestjs/graphql';
import { Plan } from './plan.entity';
import { PlanService } from './plan.service';

@Resolver(() => Plan)
export class PlanResolver {
  constructor(private readonly planService: PlanService) {}

  @Query(() => [Plan])
  async listPlans() {
    return this.planService.listPlans();
  }
}
