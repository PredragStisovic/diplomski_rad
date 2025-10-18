import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRecordFileDto {
  @IsNotEmpty()
  @IsString()
  fileId: string;

  @IsNotEmpty()
  @IsNumber()
  recordId: number;
}
