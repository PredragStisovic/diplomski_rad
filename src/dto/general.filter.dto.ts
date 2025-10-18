import { IsEnum, IsNotEmpty } from 'class-validator';
import { FilterOperator } from 'src/enum/FilterOperator';
import { GeneralFilterValue } from 'src/types/filter-types';

export class GeneralFilterField {
  value: GeneralFilterValue;

  @IsEnum(FilterOperator)
  operator: FilterOperator;
}

export class GeneralFilterDto {
  [key: string]: GeneralFilterField;
}
