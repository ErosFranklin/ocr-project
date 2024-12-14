import { Controller, Post, Body } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly openaiService: OpenAIService) {}

  @Post('completion')
  async getCompletion(@Body('prompt') prompt: string): Promise<string> {
    return this.openaiService.getLLMResponse(prompt);
  }
}