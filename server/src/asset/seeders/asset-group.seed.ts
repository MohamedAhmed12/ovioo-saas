import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetGroup } from '../asset-goup.entity';

@Injectable()
export class AssetGroupSeeder {
  constructor(
    @InjectRepository(AssetGroup)
    private readonly assetGroupRepository: Repository<AssetGroup>,
  ) {}

  async seed() {
    const assetGroup = [
      {
        title: 'logo',
        type: [],
      },
      {
        title: 'guideline',
        type: [],
      },
      {
        title: 'fonts',
        type: [],
      },
      {
        title: 'colors',
        type: [],
      },
      {
        title: 'UI{title:/UX',
        type: [],
      },
      {
        title: 'References (Design you{title: like)',

        type: [],
      },
      {
        title: 'Illustrations',
        type: [],
      },
      {
        title: 'presentation',
        type: [],
      },
      {
        title: 'video',
        type: [],
      },
      {
        title: 'others',
        type: [],
      },
    ];

    const assetGroupTable = await this.assetGroupRepository.find();
    if (assetGroupTable.length === 0) {
      await this.assetGroupRepository.save(assetGroup);
    }
  }
}
