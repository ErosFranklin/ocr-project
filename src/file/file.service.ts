import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as Tesseract from 'tesseract.js';
import axios from 'axios';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllFiles() {
    try {
      return this.prisma.file.findMany();
    } catch (error) {
      throw new HttpException('Error fetching files', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async processOCR(filePath: string): Promise<string> {
    try {
      const result = await Tesseract.recognize(filePath, 'eng');
      return result.data.text;
    } catch (error) {
      throw new HttpException('Error processing OCR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getLLMResponse(text: string): Promise<string> {
    try {
      const response = await axios.post('https://ocr-project-v2gi.onrender.com/openai/completion', { prompt: text });
      return response.data as string;
    } catch (error) {
      throw new HttpException('Error getting LLM response', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async saveFileData(filename: string, originalname: string, ocrResult: string, llmResponse: string) {
    try {
      return this.prisma.file.create({
        data: {
          name: filename,
          description: originalname,
          ocrText: ocrResult,
          llmResponse: llmResponse,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new HttpException('Error saving file data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}