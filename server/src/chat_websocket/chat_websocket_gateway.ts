import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { UsersService } from "src/users/services/users.service";
import { ChatMessageDto } from "./dto's/chatMessage.dto"
import { ChatsInDbService } from "./services/chats_in_db/chats_in_db.service";
import { ChatWebsocketFnService } from "./services/chat_websocket_fn/chat_websocket_fn.service";
import { InternalServerErrorException } from "@nestjs/common";
import { StringToJsonPipe } from "./pipes/string_to_json/string_to_json.pipe";
@WebSocketGateway(3001, { cors: { origin: '*' } })
export class ChatWebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    private connectedUsers: Map<string, { socket: Socket, username: string, connectedAt: Date }> = new Map();
    constructor(
        private usersService: UsersService,
        private chatsInDbService: ChatsInDbService,
        private chatWebsocketFnService: ChatWebsocketFnService
    ) { }


    // @SubscribeMessage('connectionMessage')
    async handleConnection(client: Socket,) {
        const username = client.handshake.headers["username"];

        try {
            if (!username || typeof username !== 'string') throw new Error('Invalid username');

            const user = await this.usersService.createUser({ username });
            this.connectedUsers.set(user.id, { socket: client, username, connectedAt: new Date() });
            client.emit('user-info', user);
            this.server.emit('user-joined', `New user connected: ${client.id}`);

        } catch (error) {
            throw new InternalServerErrorException('Internal Server Error');
        }
    }


    handleDisconnect(client: Socket) {
        console.log("New user disconnected: ", client.id);
        this.connectedUsers.delete(client.id);
        this.server.emit('user-left', client.id);
    }

    @SubscribeMessage('sendPersonalMessage')
    async handlerMessages(
        @ConnectedSocket() client: Socket,
        @MessageBody(new StringToJsonPipe(ChatMessageDto)) data: ChatMessageDto
    ) {

        const { senderUsername, receiverUsername, message } = data;
        try {
            const messageData = await this.chatsInDbService.createPersonalMessage({ senderUsername, receiverUsername, message });

            this.chatWebsocketFnService.sendPersonalMessage({ messageData, connectedUsers: this.connectedUsers });
        } catch (error) {
            console.error('Error saving message:', error);
            client.emit('createPersonalMessage', 'Failed to send message');
        }
        console.log(`Message from ${client.id}:`, message);
    }
}
