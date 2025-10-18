import { Test, TestingModule } from '@nestjs/testing';
import { RecordFileController } from './record-file.controller';
import { RecordFileService } from './record-file.service';

describe('RecordFileController', () => {
  let controller: RecordFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordFileController],
      providers: [RecordFileService],
    }).compile();

    controller = module.get<RecordFileController>(RecordFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
