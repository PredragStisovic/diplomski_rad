import { Injectable } from '@nestjs/common';
import { RecordRepository } from './record.repository';

@Injectable()
export class RecordValidator {
  constructor(private readonly repository: RecordRepository) {}

  async recordWithIdExists(id: number): Promise<boolean> {
    const userWithId = await this.repository.findById(id);

    return userWithId != null;
  }
}
