import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as Tesseract from 'tesseract.js';
import axios from 'axios';
import * as fs from 'fs';
import * as xml2js from 'xml2js';
import { OpenAIService } from '../openai/openai.service';

@Injectable()
export class FileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly openAIService: OpenAIService,
  ) {}

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

  async processXML(filePath: string): Promise<any> {
    try {
      const xmlData = fs.readFileSync(filePath, 'utf8');
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(xmlData);
      return result;
    } catch (error) {
      throw new HttpException('Error processing XML', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async extractInvoiceData(text: string): Promise<any> {
    const invoiceData = {
      date: this.extractDate(text),
      total: this.extractTotal(text),
      items: this.extractItems(text),
    };
    return invoiceData;
  }

  extractDate(text: string): string {
    const dateRegex = /\b\d{2}\/\d{2}\/\d{4}\b/;
    const match = text.match(dateRegex);
    return match ? match[0] : 'Date not found';
  }

  extractTotal(text: string): string {
    const totalRegex = /Total:\s*\$?\d+(\.\d{2})?/;
    const match = text.match(totalRegex);
    return match ? match[0] : 'Total not found';
  }

  extractItems(text: string): string[] {
    const itemsRegex = /Item:\s*(.*)/g;
    const matches = [];
    let match;
    while ((match = itemsRegex.exec(text)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  }

  async getLLMResponse(prompt: string): Promise<string> {
    try {
      return await this.openAIService.getLLMResponse(prompt);
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