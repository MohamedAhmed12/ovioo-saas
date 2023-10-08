import { Resolver } from '@nestjs/graphql';
import { Asset } from './asset.entity';
import { AssetService } from './asset.service';

@Resolver(() => Asset)
export class AssetResolver {
  constructor(private readonly assetService: AssetService) {}
}
