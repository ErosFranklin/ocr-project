import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
    const maxRetries = 5;
    let attempt = 0;
    let delay = 1000; // 1 second
    const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

    while (attempt < maxRetries) {
      try {
        const response = await this.openai.chat.completions.create({
          model: model,
          messages: [
            { role: 'user', content: prompt },
          ],
          max_tokens: 100,
        });

        return response.choices[0].message.content;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          attempt++;
          if (attempt >= maxRetries) {
            throw new HttpException('Quota exceeded for OpenAI API', HttpStatus.TOO_MANY_REQUESTS);
          }
          await this.delay(delay);
          delay *= 2; // Exponential backoff
        } else {
          throw new HttpException('Error getting LLM response', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}