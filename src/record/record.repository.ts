import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base-classes/base-repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { PrismaServiceTransaction } from 'src/types/prisma-transaction';
import { RecordFilterProcessor } from './record-filter-processor';
import { FilterDto } from 'src/dto/filter.dto';
import { Record } from '@prisma/client';

@Injectable()
export class RecordRepository extends BaseRepository {
  constructor(
    prisma: PrismaService,
    private readonly filterProcessor: RecordFilterProcessor,
  ) {
    super(prisma);
  }

  async createRecord(
    createRecordDto: CreateRecordDto,
    tx: PrismaServiceTransaction = this.prisma,
  ) {
    return tx.record.create({
      data: createRecordDto,
    });
  }

  findAll() {
    return this.prisma.record.findMany();
  }

  async filterRecords(
    filter: FilterDto,
    tx: PrismaServiceTransaction = this.prisma,
  ): Promise<Record[]> {
    const query = await this.filterProcessor.generateQuery(filter);
    return tx.record.findMany(query);
  }

  async countRecords(
    filter: FilterDto,
    tx: PrismaServiceTransaction = this.prisma,
  ): Promise<number> {
    const query = await this.filterProcessor.generateQuery(filter);
    delete query.take;
    delete query.skip;
    delete query.include;
    return tx.record.count(query);
  }

  findById(id: number) {
    return this.prisma.record.findUnique({
      where: { id },
      include: {
        RecordFiles: {
          select: {
            File: true,
          },
        },
      },
    });
  }

  findByIds(ids: number[]) {
    return this.prisma.record.findMany({
      where: { id: { in: ids } },
    });
  }

  update(
    id: number,
    updateRecordDto: UpdateRecordDto,
    tx: PrismaServiceTransaction = this.prisma,
  ) {
    return tx.record.update({
      where: { id },
      data: updateRecordDto,
    });
  }

  delete(id: number, tx: PrismaServiceTransaction = this.prisma) {
    return tx.record.delete({
      where: { id },
    });
  }
}
