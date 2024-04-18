import {
  Body,
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/shared/middlewares/auth.guard';
import { UploadAssetDto } from './dto/upload-asset.dto';
import { UploadService } from './upload.service';
import { cleanAssetDirectoryDto } from './dto/clean-asset-directory.dto';

@Controller('api')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(AuthGuard)
  @Post('file/upload')
  @UseInterceptors(FilesInterceptor('files[]', 10))
  async uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 300000000 })],
      }),
    )
    files: Express.Multer.File[],
    @Body() data: UploadAssetDto,
  ) {
    return this.uploadService.uploadFiles(files, data);
  }

  @UseGuards(AuthGuard)
  @Post('directory/clean')
  async cleanDirectory(@Body() { path }: cleanAssetDirectoryDto) {
    console.log(1212, path);

    return this.uploadService.cleanDirectory(path);
  }
}
