import { Module } from '@nestjs/common';
import { ImageGenerateService } from './image-generate.service';
import { ImageGenerateController } from './image-generate.controller';

@Module({
  controllers: [ImageGenerateController],
  providers: [ImageGenerateService],
})
export class ImageGenerateModule {}
