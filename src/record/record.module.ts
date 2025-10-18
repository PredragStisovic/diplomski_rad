import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { RecordRepository } from './record.repository';
import { RecordValidator } from './record.validator';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileModule } from 'src/file/file.module';
import { RecordFileModule } from 'src/record-file/record-file.module';
import { RecordFilterProcessor } from './record-filter-processor';

@Module({
  imports: [PrismaModule, FileModule, RecordFileModule],
  controllers: [RecordController],
  providers: [
    RecordService,
    RecordRepository,
    RecordValidator,
    RecordFilterProcessor,
  ],
  exports: [RecordService],
})
export class RecordModule {}
