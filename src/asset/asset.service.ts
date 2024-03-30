import { Bucket, Storage } from '@google-cloud/storage';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';
import { Task } from 'src/task/task.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Asset } from './asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';
import { DeleteAssetDto } from './dto/delete-asset.dto';

@Injectable()
export class AssetService {
  private s3: S3 = new S3();
  private storage: Storage;
  private bucket: Bucket;

  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {
    // Path google key file
    const keyFilename = path.join(
      __dirname,
      '..',
      '..',
      'google-cloud-key.json',
    );

    // Check if the key file exists and then initialize the Google Cloud Storage client
    if (fs.existsSync(keyFilename)) {
      const credentials = JSON.parse(fs.readFileSync(keyFilename, 'utf8'));

      this.storage = new Storage({
        projectId: credentials.project_id,
        credentials,
      });
      this.bucket = this.storage.bucket(process.env.GCS_BUCKET);
    } else {
      console.error('Service account key file not found');
      throw new Error('Service account key file not found');
    }
  }

  async listAssets(authUser: User, id?: number): Promise<Asset[]> {
    const [firstTeam] = await authUser.teams;

    const options = {
      where: {
        task: {
          team: {
            id: firstTeam.id,
          },
        },
      },
    };

    // id && (options.where.project['id'] = id);

    return await this.assetRepository.find(options);
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

    if (!res) {
      return false;
    }

    try {
      await this.bucket.file(asset.alt).delete();
      return true;
    } catch (error) {
      console.error(`Error deleting file from GCS: ${asset.alt}`, error);
      return false;
    }
  }

  async downloadAsset(key: string): Promise<string> {
    const file = this.bucket.file(key);

    try {
      const [url] = await file.getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        responseDisposition: `attachment; filename="${key}"`,
      });

      return url;
    } catch (error) {
      console.error(`Error generating signed URL for ${key}:`, error);
      throw error;
    }
  }
}
