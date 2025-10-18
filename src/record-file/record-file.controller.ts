import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RecordFileService } from './record-file.service';
import { CreateRecordFileDto } from './dto/create-record-file.dto';
import { UpdateRecordFileDto } from './dto/update-record-file.dto';

@Controller('record-file')
export class RecordFileController {
  constructor(private readonly recordFileService: RecordFileService) {}

  @Post()
  create(@Body() createRecordFileDto: CreateRecordFileDto) {
    return this.recordFileService.create(createRecordFileDto);
  }

  @Get(':fileId/:recordId')
  findOne(
    @Param('fileid') fileId: string,
    @Param('recordId') recordId: number,
  ) {
    return this.recordFileService.findOne(fileId, +recordId);
  }

  @Delete(':fileId/:recordId')
  remove(@Param('fileId') fileId: string, @Param('recordId') recordId: string) {
    return this.recordFileService.remove(fileId, +recordId);
  }
}
