import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import * as cloudinary from 'cloudinary';

@Injectable()
export class ImageGenerateService {
  private readonly openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });

    cloudinary.v2.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async editImage(prompt: string, imagePath: string, imagePrompt: string) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: "What's in this image? whole details in a single paragraph" },
              {
                type: 'image_url',
                image_url: {
                  url: imagePrompt,
                },
              },
            ],
          },
        ],
      });

      console.log(response.choices[0].message.content);

      const imageResponse = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt: response.choices[0].message.content + prompt,
        response_format: 'b64_json',
      });

      const base64Data = imageResponse.data[0].b64_json;
      const generatedImagePath = path.join(__dirname, 'generated-image.png'); // Use current directory

      // Ensure the directory exists
      const dir = path.dirname(generatedImagePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(generatedImagePath, base64Data, 'base64');

      const uploadResult = await cloudinary.v2.uploader.upload(generatedImagePath, {
        folder: 'Devq_response', 
      });

      console.log('data', uploadResult.url);
      return { url: uploadResult.url };
    } catch (error) {
      throw new Error(`Failed to edit image with OpenAI: ${error.message}`);
    }
  }
}
