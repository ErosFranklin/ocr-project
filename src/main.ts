import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // Permitir CORS apenas de origens específicas
  app.enableCors({
    origin: [
      'http://localhost:3000', // Durante o desenvolvimento no local
      'https://ocr-project-v2gi.onrender.com', // URL do seu aplicativo em produção no Render
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
