import { IsNotEmpty, IsString } from 'class-validator';
import { cleanAssetDirectoryDto } from './clean-asset-directory.dto';

export class UploadAssetDto extends cleanAssetDirectoryDto {
  @IsNotEmpty()
  @IsString()
  inDirectory: string;
}
