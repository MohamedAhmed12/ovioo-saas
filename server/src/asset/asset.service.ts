import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/task.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Asset } from './asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';
import { S3 } from 'aws-sdk';
import { DeleteAssetDto } from './dto/delete-asset.dto';

@Injectable()
export class AssetService {
  private s3: S3;

  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {
    this.s3 = new S3({
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_KEY_SECRET,
      region: 'eu-west-1',
    });
  }

  async createAssets(
    authUser: User,
    { task_id, assets }: CreateAssetDto,
  ): Promise<Asset[]> {
    const task = await this.taskRepository.findOne({
      where: {
        id: +task_id,
      },
      relations: ['project'],
    });

    if (!task)
      throw new NotFoundException('Couldn’t find task matches this id.');

    const assetsList = await Promise.all(
      assets.map(async (assetData) => {
        const asset = await this.assetRepository.create(assetData);
        asset.task = task;
        asset.project = await task.project;

        return asset;
      }),
    );

    return await this.assetRepository.save(assetsList);
  }

  async deleteAsset(asset: DeleteAssetDto) {
    const res = await !!this.assetRepository.delete(asset.id);
    const S3Res = await this.s3
      .deleteObject({
        Bucket: process.env.S3_BUCKET,
        Key: asset.src,
        VersionId: asset.version_id,
      })
      .promise();

    console.log(S3Res);

    return res && !S3Res.DeleteMarker && S3Res.VersionId == asset.version_id;
  }
}
