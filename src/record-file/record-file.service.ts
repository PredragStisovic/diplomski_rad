import { Injectable } from '@nestjs/common';
import { CreateRecordFileDto } from './dto/create-record-file.dto';
import { UpdateRecordFileDto } from './dto/update-record-file.dto';
import { RecordFileRepository } from './record-file.repository';
import { PrismaServiceTransaction } from 'src/types/prisma-transaction';

@Injectable()
export class RecordFileService {
  constructor(private readonly RecordFileRepository: RecordFileRepository) {}
  async create(
    createRecordFileDto: CreateRecordFileDto,
    tx?: PrismaServiceTransaction,
  ) {
    return this.RecordFileRepository.create(createRecordFileDto, tx);
  }

  findOne(fileId: string, recordId: number) {
    return this.RecordFileRepository.findById(fileId, recordId);
  }

  remove(fileId: string, recordId: number) {
    return this.RecordFileRepository.delete(fileId, recordId);
  }
}
