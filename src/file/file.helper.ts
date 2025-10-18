import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { FilesRepository } from './file.repository';

@Injectable()
export class FilesHelper {
  constructor(private readonly repository: FilesRepository) {}

  async fileWithIdExists(id: string): Promise<boolean> {
    const fileWithId = await this.repository.getFile(id);
    return fileWithId != null;
  }

  isIncomingFileImage(mimeType: string): boolean {
    const imageFileMimeTypePrefix = 'image/';

    const isFileAnImage: boolean = mimeType.startsWith(imageFileMimeTypePrefix);

    return isFileAnImage;
  }

  getCreateFileDto(file: Express.Multer.File): CreateFileDto {
    const dto: CreateFileDto = {
      name: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
    };

    return dto;
  }
}
