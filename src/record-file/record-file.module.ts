import { Module } from '@nestjs/common';
import { RecordFileService } from './record-file.service';
import { RecordFileController } from './record-file.controller';
import { RecordFileRepository } from './record-file.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RecordFileController],
  providers: [RecordFileService, RecordFileRepository],
  exports: [RecordFileService, RecordFileRepository],
})
export class RecordFileModule {}
