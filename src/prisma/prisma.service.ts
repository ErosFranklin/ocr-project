import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  customFile: any;
  constructor() {
    super();
    this.customFile = {}; // Initialize the customFile property
  }
}
