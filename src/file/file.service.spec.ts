import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { PrismaService } from '../prisma/prisma.service';

describe('FileService', () => {
  let service: FileService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService, PrismaService],
    }).compile();

    service = module.get<FileService>(FileService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllFiles', () => {
    it('should return an array of files', async () => {
      const result = [];
      jest.spyOn(prisma.file, 'findMany').mockResolvedValue(result);

      expect(await service.getAllFiles()).toBe(result);
    });
  });
});