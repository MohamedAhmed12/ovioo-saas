import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { UploadAssetDto } from './dto/upload-asset.dto';

@Injectable()
export class UploadService {
  private storage: Storage;

  constructor() {
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
    } else {
      console.error('Service account key file not found');
      throw new Error('Service account key file not found');
    }
  }

  async uploadFiles(
    files: Express.Multer.File[],
    { path, inDirectory }: UploadAssetDto,
  ): Promise<any[]> {
    const filesPaths = [];

    for (const file of files) {
      const bucketName = process.env.GCS_BUCKET;
      const fileName =
        inDirectory.toLowerCase() == 'true'
          ? `${path}/${String(file.originalname)}`
          : path;
      const bucket = this.storage.bucket(bucketName);
      const fileHandle = bucket.file(fileName);

      try {
        await fileHandle.save(file.buffer, {
          contentType: file.mimetype,
          metadata: {
            contentDisposition: 'inline',
          },
        });

        // Construct the file path or URL as needed
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

        filesPaths.push({
          type: file.mimetype,
          alt: file.originalname,
          gcsPath: publicUrl,
        });
      } catch (error) {
        console.error(`Error uploading file ${file.originalname}:`, error);
      }
    }

    return filesPaths;
  }
}
