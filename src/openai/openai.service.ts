import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getLLMResponse(prompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: prompt }, // Substituí 'Sua mensagem aqui...' pelo parâmetro prompt
        ],
        max_tokens: 100,
    });

    // A resposta correta é acessada pelo campo message.content
    return response.choices[0].message.content;
}
}