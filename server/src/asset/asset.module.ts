import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/task/task.entity';
import { Team } from 'src/team/team.entity';
import { AssetGroup } from './asset-goup.entity';
import { Asset } from './asset.entity';
import { AssetResolver } from './asset.resolver';
import { AssetService } from './asset.service';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, AssetGroup, Task, Team])],
  providers: [AssetResolver, AssetService, UploadService],
  controllers: [UploadController],
})
export class AssetModule {}
