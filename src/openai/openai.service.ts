import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OpenAI } from 'openai';
import 'dotenv/config';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    console.log("Carregando OpenAIService...");
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    console.log("OpenAIService carregado com sucesso!");
  }
  

  async getLLMResponse(prompt: string): Promise<string> {
    const maxRetries = 5;
    let attempt = 0;
    let delay = 1000; 
    let maxDelay = 8000;
    console.log("API Key: ", process.env.OPENAI_API_KEY)
    while (attempt < maxRetries) {
      try {
        const response = await this.openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: 'user', content: prompt },
          ],
          max_tokens: 100,
        });
        console.log('reposta recebida OpenAI API:', response);
        return response.choices[0].message.content;
      } catch (error) {
        console.error(`Erro na tentativa ${attempt + 1} da API OpenAI:`, error);

        if (error.response) {
          const statusCode = error.response.status;

          // Tratar erro 429 (Too Many Requests)
          if (statusCode === 429) {
            attempt++;
            if (attempt >= maxRetries) {
              throw new HttpException('Quota excedida para a API OpenAI', HttpStatus.TOO_MANY_REQUESTS);
            }
            console.log(`Aguardando ${delay / 1000}s antes de tentar novamente...`);
            await this.delay(delay);
            delay = Math.min(delay * 2, maxDelay); // Exponential backoff limitado ao maxDelay
            continue;
          }

          // Tratar erro 401 (Unauthorized)
          if (statusCode === 401) {
            throw new HttpException('Chave da API OpenAI inválida ou não autorizada', HttpStatus.UNAUTHORIZED);
          }

          // Tratar erro genérico 500 (Internal Server Error)
          if (statusCode === 500) {
            throw new HttpException('Erro interno na API OpenAI', HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }

        // Lançar erro genérico para falhas inesperadas
        throw new HttpException('Erro ao conectar com a API OpenAI', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}