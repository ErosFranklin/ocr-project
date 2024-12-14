import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OpenAIModule } from './openai/openai.module';
import { PrismaModule } from './prisma/prisma.module';
import { FileModule} from './file/file.module';

@Module({
  imports: [UserModule, PrismaModule, OpenAIModule, FileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

