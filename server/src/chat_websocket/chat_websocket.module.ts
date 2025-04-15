import { Module } from '@nestjs/common';
import { ChatWebsocketGateway } from './chat_websocket_gateway';
import { UsersModule } from 'src/users/users.module';
import { ChatsInDbService } from './services/chats_in_db/chats_in_db.service';
import { ChatWebsocketFnService } from './services/chat_websocket_fn/chat_websocket_fn.service';

@Module({
    imports: [UsersModule],
    providers: [ChatWebsocketGateway, ChatsInDbService, ChatWebsocketFnService]
})
export class ChatWebsocketModule { }
