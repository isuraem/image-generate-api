import { Controller, Post, UseInterceptors, UploadedFile, Body, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageGenerateService } from './image-generate.service';
import * as path from 'path';
import * as fs from 'fs';
import { Express } from 'express';

@Controller('image-generate')
export class ImageGenerateController {
  constructor(private readonly imageGenerateService: ImageGenerateService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('prompt') prompt: string,
    @Body('image_prompt') image_prompt: string,
  ) {
    if (!prompt) {
      throw new BadRequestException('No prompt provided');
    }

    let filePath = null;

    if (file) {
      // Save the uploaded file to a temporary directory
      const tempDir = path.join(__dirname, '..', 'temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
      filePath = path.join(tempDir, file.originalname);
      fs.writeFileSync(filePath, file.buffer);
    }

    // Call the service to edit the image
    const result = await this.imageGenerateService.editImage(prompt, filePath, image_prompt);

    // Clean up the temporary file
    if (filePath) {
      fs.unlinkSync(filePath);
    }

    return result;
  }
}
