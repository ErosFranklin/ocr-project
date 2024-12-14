import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
    const ocrResult = await this.fileService.processOCR(file.path);
    const llmResponse = await this.fileService.getLLMResponse(ocrResult);
    const savedFile = await this.fileService.saveFileData(file.filename, file.originalname, ocrResult, llmResponse);
    return savedFile;
  }

  @Get('all')
  async getAllFiles() {
    return this.fileService.getAllFiles();
  }
}