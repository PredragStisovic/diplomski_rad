import { Test, TestingModule } from '@nestjs/testing';
import { RecordFileService } from './record-file.service';

describe('RecordFileService', () => {
  let service: RecordFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordFileService],
    }).compile();

    service = module.get<RecordFileService>(RecordFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
