import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ChatWebsocketModule } from './chat_websocket/chat_websocket.module';

@Module({
  imports: [PrismaModule, UsersModule, ChatWebsocketModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule { }