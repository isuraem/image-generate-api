import { Test, TestingModule } from '@nestjs/testing';
import { ImageGenerateService } from './image-generate.service';

describe('ImageGenerateService', () => {
  let service: ImageGenerateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageGenerateService],
    }).compile();

    service = module.get<ImageGenerateService>(ImageGenerateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
