import { Args, Query, Resolver } from '@nestjs/graphql';
import { Portfolio } from './portfolio.entity';
import { PortfolioService } from './portfolio.service';

@Resolver(() => Portfolio)
export class PortfolioResolver {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Query(() => [Portfolio])
  async listPortfolio(
    @Args('category', { type: () => String, nullable: true })
    category: string,
  ) {
    return this.portfolioService.find(category || 'all');
  }
}
