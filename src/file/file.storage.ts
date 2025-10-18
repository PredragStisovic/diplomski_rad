import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { SharpFormatEnum, SharpPipeline } from './types/Sharp';

@Injectable()
export class FilesStorage {
  private storagePath: string;
  constructor(private config: ConfigService) {
    this.storagePath = this.config.getOrThrow<string>('FILE_STORAGE');
  }

  async ensureDirectoryExists(): Promise<void> {
    try {
      await fs.promises.access(this.storagePath, fs.constants.F_OK);
    } catch (error) {
      await fs.promises.mkdir(this.storagePath, { recursive: true });
    }
  }

  async storeFile(buffer: Buffer, fileName: string): Promise<void> {
    await this.ensureDirectoryExists();
    const filePath = path.join(this.storagePath, fileName);
    await fs.promises.writeFile(filePath, buffer as Uint8Array);
  }

  async storeImageFile(buffer: Buffer, fileName: string): Promise<void> {
    await this.ensureDirectoryExists();
    const filePath = path.join(this.storagePath, fileName);

    const metadata = await sharp(buffer).metadata();

    const maxWidth = 1280;
    const maxHeight = 800;

    const limitIsExceeded =
      (metadata.width && metadata.width > maxWidth) ||
      (metadata.height && metadata.height > maxHeight);

    const format = metadata.format;

    if (limitIsExceeded) {
      await this.storeResizedImage(
        buffer,
        filePath,
        format,
        maxWidth,
        maxHeight,
      );
    } else {
      await this.storeOriginalSizeImage(buffer, filePath, format);
    }
  }

  async storeResizedImage(
    buffer: Buffer,
    filePath: string,
    format: SharpFormatEnum,
    maxWidth: number,
    maxHeight: number,
  ) {
    const resizeOptions: sharp.ResizeOptions = {
      width: maxWidth,
      height: maxHeight,
      fit: 'inside',
      withoutEnlargement: true,
    };

    let pipeline = sharp(buffer).resize(resizeOptions);

    pipeline = this.applyFormat(pipeline, format);

    await pipeline.toFile(filePath);
  }

  async storeOriginalSizeImage(
    buffer: Buffer,
    filePath: string,
    format: SharpFormatEnum,
  ) {
    let pipeline = sharp(buffer);

    pipeline = this.applyFormat(pipeline, format);

    await pipeline.toFile(filePath);
  }

  applyFormat(pipeline: SharpPipeline, format: SharpFormatEnum): SharpPipeline {
    if (!format) {
      return pipeline;
    }

    const jpegCheck = ['jpeg', 'jpg'].includes(format);
    const pngCheck = format === 'png';
    const webpCheck = format === 'webp';
    const avifCheck = format === 'avif';

    if (jpegCheck) {
      return pipeline.jpeg({ quality: 80 });
    } else if (pngCheck) {
      return pipeline.png({ compressionLevel: 9 });
    } else if (webpCheck) {
      return pipeline.webp({ quality: 80 });
    } else if (avifCheck) {
      return pipeline.avif({ quality: 80 });
    } else {
      return pipeline;
    }
  }

  async retrieveFile(fileName: string): Promise<Buffer> {
    const filePath = path.join(this.storagePath, fileName);
    return await fs.promises.readFile(filePath);
  }

  async deleteFile(fileName: string): Promise<void> {
    const filePath = path.join(this.storagePath, fileName);
    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      throw new HttpException(
        `Could not delete file from filesystem: ${fileName}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
