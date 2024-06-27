import { Test, TestingModule } from '@nestjs/testing';
import { ImageGenerateController } from './image-generate.controller';
import { ImageGenerateService } from './image-generate.service';

describe('ImageGenerateController', () => {
  let controller: ImageGenerateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageGenerateController],
      providers: [ImageGenerateService],
    }).compile();

    controller = module.get<ImageGenerateController>(ImageGenerateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
