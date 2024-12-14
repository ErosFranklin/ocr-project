import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  file: any;
  constructor() {
    super();
    this.file = {}; // Initialize the file property
  }
}
