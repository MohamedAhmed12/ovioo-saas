import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { Task } from 'src/task/task.entity';
import { Team } from 'src/team/team.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Asset } from './asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';
import { DeleteAssetDto } from './dto/delete-asset.dto';

@Injectable()
export class AssetService {
  private s3: S3 = new S3();

  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async listAssets(authUser: User): Promise<any> {
    const team = await authUser.team;

    return await this.assetRepository.find({
      where: {
        project: {
          team: {
            id: team.id,
          },
        },
      },
    });
  }

  async createAssets({ task_id, assets }: CreateAssetDto): Promise<Asset[]> {
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

  async deleteAsset(asset: DeleteAssetDto): Promise<boolean> {
    const res = asset?.id
      ? await !!this.assetRepository.delete(asset.id)
      : true;

    const S3Res = await this.s3
      .deleteObject({
        Bucket: process.env.S3_BUCKET,
        Key: asset.alt,
      })
      .promise();

    return res && !S3Res.DeleteMarker;
  }

  async downloadAsset(Key: string): Promise<string> {
    return this.s3.getSignedUrl('getObject', {
      Bucket: process.env.S3_BUCKET,
      Key,
      ResponseContentDisposition: `attachment; filename="${Key}"`,
    });
  }
}
