import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS using environment variables
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    methods: process.env.CORS_METHODS,
    credentials: process.env.CORS_CREDENTIALS === 'true',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();