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
    credentials: true, // Permitir envio de cookies, caso necessário
    preflightContinue: true, // Garantir que as requisições OPTIONS sejam tratadas corretamente
  });

  // Adicionar tratamento para OPTIONS (não é estritamente necessário, pois o NestJS já lida com isso com o `enableCors`)
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', '*'); // Permitir a origem para todas as requisições
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos HTTP permitidos
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Cabeçalhos permitidos
      return res.status(204).send(); // Retorna uma resposta vazia com status 204 para requisições OPTIONS
    }
    next();
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
