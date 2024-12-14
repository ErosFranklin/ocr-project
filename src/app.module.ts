import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { FileModule } from './file/file.module';
import { OpenAIModule } from './openai/openai.module';

@Module({
  imports: [UserModule, PrismaModule, FileModule, OpenAIModule],
})
export class AppModule {}

