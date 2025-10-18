import {
  Controller,
  Post,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  Res,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { FilesService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async saveFile(@UploadedFile() file: Express.Multer.File) {
    return await this.fileService.saveFile(file);
  }

  @Get(':id/:companyProfileId')
  async getFile(@Param('id') id: string, @Res() response: Response) {
    const { fileMeta, fileContent } = await this.fileService.getFile(id);

    response.header('Content-Type', fileMeta.mimeType);
    response.send(fileContent);
  }

  @Delete(':id/:companyProfileId')
  async remove(@Param('id') id: string): Promise<void> {
    await this.fileService.deleteFile(id);
  }
}
