import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule { }