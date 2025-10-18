import { Injectable } from '@nestjs/common';
import { BaseFilterProcessor } from 'src/base-classes/base-filter-processor/base-filter-processor';

@Injectable()
export class OrderFilterProcessor extends BaseFilterProcessor {
  constructor() {
    super();
  }

  // eslint-disable-next-line
  public processSpecificFilter(specificFilter: any) {
    return [];
  }
}
