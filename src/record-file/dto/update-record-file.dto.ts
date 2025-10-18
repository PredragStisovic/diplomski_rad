import { PartialType } from '@nestjs/mapped-types';
import { CreateRecordFileDto } from './create-record-file.dto';

export class UpdateRecordFileDto extends PartialType(CreateRecordFileDto) {}
