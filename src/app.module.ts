import { Module } from '@nestjs/common';
import { ImageGenerateModule } from './image-generate/image-generate.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ImageGenerateModule,
  ],
})
export class AppModule {}
