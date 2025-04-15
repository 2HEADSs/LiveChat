import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

type PersonalMessage = {
    server: Server;
    client: Socket;
    message: string
}

@Injectable()
export class ChatWebsocketFnService {
    sendPersonalMessage({ server, client, message }: PersonalMessage) {
        server.emit('eventMessage', message);
    }
 }
