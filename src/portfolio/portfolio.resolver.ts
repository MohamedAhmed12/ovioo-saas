import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/shared/middlewares/auth.guard';
import { Portfolio } from './portfolio.entity';
import { PortfolioService } from './portfolio.service';

@Resolver(() => Portfolio)
export class PortfolioResolver {
  constructor(private readonly portfolioService: PortfolioService) {}

  @UseGuards(new AuthGuard())
  @Query(() => [Portfolio])
  async listPortfolio(
    @Args('category', { type: () => String, defaultValue: 'All' })
    category: string,
  ) {
    return this.portfolioService.find(category);
  }
}
