import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { GeneralFilterDto } from './general.filter.dto';
import { RelatedFilterDto } from './related.filter.dto';

export class FilterDto {
  @IsOptional()
  general?: GeneralFilterDto;

  @IsOptional()
  specific?: any;

  @IsOptional()
  related?: RelatedFilterDto;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  skip?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  take?: number;

  @IsOptional()
  orderBy?:
    | {
        [key: string]: string;
      }
    | {
        [key: string]: {
          [key: string]: string;
        };
      }
    | any;

  @IsOptional()
  orderBySpecific?: { [key: string]: boolean };

  @IsOptional()
  @Transform(({ value }) => {
    return typeof value === 'string' ? [value] : value;
  })
  include?: string[] | any;
  @IsOptional()
  productionStatus?: number;
}
