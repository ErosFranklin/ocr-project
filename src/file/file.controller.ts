import { Controller, Get } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('all')
  async getAllFiles() {
    return this.fileService.getAllFiles();
  }
}