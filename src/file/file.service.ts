import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as Tesseract from 'tesseract.js';
import axios from 'axios';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllFiles() {
    return this.prisma.file.findMany();
  }

  async processOCR(filePath: string): Promise<string> {
    const result = await Tesseract.recognize(filePath, 'eng');
    return result.data.text;
  }

  async getLLMResponse(text: string): Promise<string> {
    const response = await axios.post('https://ocr-project-v2gi.onrender.com/openai/completion', { prompt: text });
    return response.data as string;
  }

  async saveFileData(filename: string, originalname: string, ocrResult: string, llmResponse: string) {
    return this.prisma.file.create({
      data: {
        name: filename,
        description: originalname,
        ocrText: ocrResult,
        llmResponse: llmResponse,
      },
    });
  }
}