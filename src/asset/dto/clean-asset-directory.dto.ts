import { IsNotEmpty, IsString } from 'class-validator';

export class cleanAssetDirectoryDto {
  @IsNotEmpty()
  @IsString()
  path: string;
}
