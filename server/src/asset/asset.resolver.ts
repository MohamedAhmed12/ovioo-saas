import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/shared/middlewares/auth.guard';
import { User } from 'src/user/user.entity';
import { Asset } from './asset.entity';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { DeleteAssetDto } from './dto/delete-asset.dto';

@Resolver(() => Asset)
export class AssetResolver {
  constructor(private readonly assetService: AssetService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => [Asset])
  async createAssets(
    @Context('user') authUser: User,
    @Args('data') data: CreateAssetDto,
  ) {
    return await this.assetService.createAssets(authUser, data);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async deleteAsset(@Args('asset') asset: DeleteAssetDto) {
    return await this.assetService.deleteAsset(asset);
  }
}
