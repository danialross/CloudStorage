import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-type', 'Authorization'],
    origin: [process.env.FRONTEND_URL],
  });
  console.log(process.env.FRONTEND_URL);
  await app.listen(process.env.PORT || 3000);
  console.log(`Server started on port ${process.env.PORT}`);
}

bootstrap();
