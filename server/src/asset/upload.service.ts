import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';

@Injectable()
export class UploadService {
  private s3: S3 = new S3();

  async uploadFiles(
    files: Express.Multer.File[],
    path: string,
  ): Promise<ManagedUpload.SendData[]> {
    const filesPaths = [];

    for (const file of files) {
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: String(path),
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
        ContentDisposition: 'inline',
        CreateBucketConfiguration: {
          LocationConstraint: 'eu-west-1',
        },
      };

      try {
        const path = await this.s3.upload(params).promise();
        path &&
          filesPaths.push({
            type: file.mimetype,
            s3Path: path,
          });
      } catch (error) {
        console.error(`Error uploading file ${file.originalname}:`, error);
      }
    }

    return filesPaths;
  }
}
