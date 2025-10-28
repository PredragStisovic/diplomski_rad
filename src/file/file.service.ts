import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { File } from '@prisma/client';
import { PrismaServiceTransaction } from 'src/types/prisma-transaction';
import { FilesStorage } from './file.storage';
import { randomUUID } from 'crypto';
import { FilesRepository } from './file.repository';
import { FilesHelper } from './file.helper';

@Injectable()
export class FilesService {
  constructor(
    private readonly repository: FilesRepository,
    private readonly fileStorage: FilesStorage,
    private readonly helper: FilesHelper,
  ) {}

  async saveFile(
    file: Express.Multer.File,
    tx?: PrismaServiceTransaction,
  ): Promise<File> {
    let createdFile: File | null = null;

    const isImage = this.helper.isIncomingFileImage(file.mimetype);

    if (isImage) {
      createdFile = await this.saveImageFile(file, tx);
    } else {
      createdFile = await this.saveNonImageFile(file, tx);
    }

    return createdFile;
  }

  async saveImageFile(
    file: Express.Multer.File,
    tx?: PrismaServiceTransaction,
  ): Promise<File> {
    const dto = this.helper.getCreateFileDto(file);

    const createdImage = await this.repository.createFile(dto, tx);

    await this.fileStorage.storeImageFile(file.buffer, createdImage.id);

    return createdImage;
  }

  async saveNonImageFile(
    file: Express.Multer.File,
    tx?: PrismaServiceTransaction,
  ): Promise<File> {
    const dto = this.helper.getCreateFileDto(file);

    const createdFile = await this.repository.createFile(dto, tx);

    await this.fileStorage.storeFile(file.buffer, createdFile.id);

    return createdFile;
  }

  async getFile(id: string): Promise<{ fileMeta: File; fileContent: Buffer }> {
    const file = await this.repository.getFile(id);

    if (!file) {
      throw new HttpException(`files.not_found`, HttpStatus.NOT_FOUND);
    }

    const fileBuffer = await this.fileStorage.retrieveFile(id);

    return {
      fileMeta: file,
      fileContent: fileBuffer,
    };
  }

  async deleteFile(id: string, tx?: PrismaServiceTransaction): Promise<void> {
    const file = await this.repository.getFile(id, tx);

    if (!file) {
      throw new HttpException(`files.not_found`, HttpStatus.NOT_FOUND);
    }

    await this.fileStorage.deleteFile(file.id);
    await this.repository.deleteFile(id, tx);
  }

  async deletePhysicalFile(id: string): Promise<void> {
    await this.fileStorage.deleteFile(id);
  }

  async deleteFileForRecordId(recordId: number, tx?: PrismaServiceTransaction) {
    const files = await this.repository.getFilesForRecordId(recordId, tx);

    for (const file of files) {
      await this.fileStorage.deleteFile(file.id);
      await this.repository.deleteFile(file.id, tx);
    }
  }

  async createPhysicalFile(file: Express.Multer.File): Promise<string> {
    const fileUUID = randomUUID();
    const isImage = this.helper.isIncomingFileImage(file.mimetype);

    if (isImage) {
      await this.fileStorage.storeImageFile(file.buffer, fileUUID);
    } else {
      await this.fileStorage.storeFile(file.buffer, fileUUID);
    }
    return fileUUID;
  }

  async saveFileWithoutPhysical(
    file: Express.Multer.File,
    fileUUID: string,
    tx?: PrismaServiceTransaction,
  ): Promise<File> {
    const dto = this.helper.getCreateFileDto(file);

    const createdFile = await this.repository.createFileWithId(
      dto,
      fileUUID,
      tx,
    );

    return createdFile;
  }
}
