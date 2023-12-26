import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
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
  @Query(() => [Asset])
  async listAssets(
    @Context('user') authUser: User,
    @Args('id', { nullable: true }) id?: string,
  ) {
    return await this.assetService.listAssets(authUser, +id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => [Asset])
  async createAssets(@Args('data') data: CreateAssetDto) {
    return await this.assetService.createAssets(data);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async deleteAsset(@Args('asset') asset: DeleteAssetDto) {
    return await this.assetService.deleteAsset(asset);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String)
  async downloadAsset(@Args('alt') alt: string) {
    return await this.assetService.downloadAsset(alt);
  }
}
