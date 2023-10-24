import {
  Body,
  Controller,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/shared/middlewares/auth.guard';
import { UploadService } from './upload.service';
import { UploadAssetDto } from './dto/upload-asset.dto';

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
    @Body() { path }: UploadAssetDto,
  ) {
    return this.uploadService.uploadFiles(files, path);
  }
}
