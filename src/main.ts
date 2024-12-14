import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // Permitir CORS apenas de origens específicas
  app.enableCors({
    origin: ['http://localhost:3000', 'https://ocr-project-v2gi.onrender.com'], // URL específica
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Permitir envio de cookies, caso necessário
  });

  // Adicionar tratamento para OPTIONS
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.status(200).send();
    } else {
      next();
    }
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
