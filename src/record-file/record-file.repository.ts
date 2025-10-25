import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base-classes/base-repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecordFileDto } from './dto/create-record-file.dto';
import { PrismaServiceTransaction } from 'src/types/prisma-transaction';

@Injectable()
export class RecordFileRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  create(
    createRecordFiledto: CreateRecordFileDto,
    tx: PrismaServiceTransaction = this.prisma,
  ) {
    return tx.recordFile.create({
      data: createRecordFiledto,
    });
  }

  findById(fileId: string, recordId: number) {
    return this.prisma.recordFile.findFirst({
      where: { fileId, recordId },
    });
  }

  delete(fileId: string, recordId: number) {
    return this.prisma.recordFile.delete({
      where: { fileId_recordId: { fileId, recordId } },
    });
  }

  update(
    fileId: string,
    recordId: number,
    tx: PrismaServiceTransaction = this.prisma,
  ) {
    return tx.recordFile.updateMany({
      where: { recordId },
      data: { fileId },
    });
  }
}
