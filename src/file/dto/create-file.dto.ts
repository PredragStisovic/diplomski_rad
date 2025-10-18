import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateFileDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  mimeType: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  size: number;

  @IsOptional()
  fileType?: string;
}
