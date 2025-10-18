import { Injectable } from '@nestjs/common';
import { File, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaServiceTransaction } from 'src/types/prisma-transaction';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { BaseRepository } from 'src/base-classes/base-repository';

@Injectable()
export class FilesRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async createFile(
    data: CreateFileDto,
    tx: PrismaServiceTransaction = this.prisma,
  ): Promise<File> {
    return tx.file.create({ data });
  }

  async createFileWithId(
    data: CreateFileDto,
    id: string,
    tx: PrismaServiceTransaction = this.prisma,
  ): Promise<File> {
    return tx.file.create({
      data: {
        id,
        ...data,
      },
    });
  }

  async createManyFiles(
    data: CreateFileDto[],
    tx: PrismaServiceTransaction = this.prisma,
  ): Promise<Prisma.BatchPayload> {
    return tx.file.createMany({ data });
  }

  async getFile(
    id: string,
    tx: PrismaServiceTransaction = this.prisma,
  ): Promise<File | null> {
    return tx.file.findUnique({ where: { id } });
  }

  async getFiles(tx: PrismaServiceTransaction = this.prisma): Promise<File[]> {
    return tx.file.findMany();
  }

  async updateFile(
    id: string,
    data: UpdateFileDto,
    tx: PrismaServiceTransaction = this.prisma,
  ): Promise<File> {
    return tx.file.update({ where: { id }, data });
  }

  async deleteFile(
    id: string,
    tx: PrismaServiceTransaction = this.prisma,
  ): Promise<File> {
    return tx.file.delete({ where: { id } });
  }
}
