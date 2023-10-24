import { IsNotEmpty, IsString } from 'class-validator';

export class UploadAssetDto {
  @IsNotEmpty()
  @IsString()
  path: string;
}
