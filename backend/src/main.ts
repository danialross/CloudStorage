import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    methods: ['GET', 'POST', 'DELETE'],
    origin: [process.env.FRONTEND_URL],
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT || 3000);
  console.log(`Server started on port ${process.env.PORT}`);
}

bootstrap();
