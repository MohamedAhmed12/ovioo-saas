import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, Repository } from 'typeorm';
import { Portfolio } from './portfolio.entity';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
  ) {}

  async find(category: string): Promise<Portfolio[]> {
    return await this.portfolioRepository.find({
      where: {
        categories: ArrayContains([category]),
      },
    });
  }
}
