import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OpenAIModule } from './openai/openai.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule, OpenAIModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

