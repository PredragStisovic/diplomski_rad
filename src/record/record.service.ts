import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { RecordRepository } from './record.repository';
import { RecordValidator } from './record.validator';
import { FilesService } from 'src/file/file.service';
import { RecordFileService } from 'src/record-file/record-file.service';
import { FilterDto } from 'src/dto/filter.dto';

@Injectable()
export class RecordService {
  constructor(
    private readonly recordRepository: RecordRepository,
    private readonly validator: RecordValidator,
    private readonly fileService: FilesService,
    private readonly recordFileService: RecordFileService,
  ) {}
  async create(
    createRecordDto: CreateRecordDto,
    allFiles?: Express.Multer.File[],
  ) {
    return await this.recordRepository.executeTransaction(
      async (transaction) => {
        const createdRecord = await this.recordRepository.createRecord(
          createRecordDto,
          transaction,
        );
        if (allFiles && allFiles.length > 0) {
          for (const file of allFiles) {
            const createdFile = await this.fileService.saveFile(
              file,
              transaction,
            );
            await this.recordFileService.create(
              {
                fileId: createdFile.id,
                recordId: createdRecord.id,
              },
              transaction,
            );
          }
        }
        return createdRecord;
      },
    );
  }

  findAll() {
    return this.recordRepository.findAll();
  }

  filterAll(filter: FilterDto) {
    return this.recordRepository.executeTransaction(async (transaction) => {
      const data = await this.recordRepository.filterRecords(
        filter,
        transaction,
      );
      const totalCount = await this.recordRepository.countRecords(
        filter,
        transaction,
      );

      return { data, totalCount };
    });
  }

  findOne(id: number) {
    return this.recordRepository.findById(id);
  }

  update(id: number, updateRecordDto: UpdateRecordDto) {
    if (!this.validator.recordWithIdExists(id)) {
      throw new HttpException(
        'Ploca sa ovim ID-em ne postoji',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.recordRepository.update(id, updateRecordDto);
  }

  remove(id: number) {
    if (!this.validator.recordWithIdExists(id)) {
      throw new HttpException(
        'Ploca sa ovim ID-em ne postoji',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.recordRepository.delete(id);
  }
}
