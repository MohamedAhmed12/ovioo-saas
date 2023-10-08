import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './asset.entity';
import { AssetResolver } from './asset.resolver';
import { AssetService } from './asset.service';

@Module({
  imports: [TypeOrmModule.forFeature([Asset])],
  providers: [AssetResolver, AssetService],
})
export class AssetModule {}
