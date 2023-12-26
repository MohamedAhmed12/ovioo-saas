import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './asset.entity';
import { AssetResolver } from './asset.resolver';
import { AssetService } from './asset.service';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { Task } from 'src/task/task.entity';
import { Team } from 'src/team/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, Task, Team])],
  providers: [AssetResolver, AssetService, UploadService],
  controllers: [UploadController],
})
export class AssetModule {}
