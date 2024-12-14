import { Controller, Get, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      let ocrResult = '';
      if (file.mimetype === 'application/xml' || file.mimetype === 'text/xml') {
        const xmlResult = await this.fileService.processXML(file.path);
        ocrResult = JSON.stringify(xmlResult);
      } else {
        ocrResult = await this.fileService.processOCR(file.path);
      }
      const invoiceData = await this.fileService.extractInvoiceData(ocrResult);
      const llmResponse = await this.fileService.getLLMResponse(JSON.stringify(invoiceData));
      const savedFile = await this.fileService.saveFileData(file.filename, file.originalname, ocrResult, llmResponse);
      return savedFile;
    } catch (error) {
      console.error('Error processing file:', error);
      throw new HttpException('Error processing file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('all')
  async getAllFiles() {
    return this.fileService.getAllFiles();
  }
}