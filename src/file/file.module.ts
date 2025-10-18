import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FilesService } from './file.service';
import { FilesHelper } from './file.helper';
import { FilesStorage } from './file.storage';
import { FilesRepository } from './file.repository';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FileController],
  providers: [
    FilesService,
    FilesHelper,
    FilesStorage,
    FilesRepository,
    ConfigService,
  ],
  exports: [FilesService],
})
export class FileModule {}
