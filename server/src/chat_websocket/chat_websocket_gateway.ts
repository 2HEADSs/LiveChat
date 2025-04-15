import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { UsersService } from "src/users/services/users.service";
import { ChatMessageDto } from "./dto's/chatMessage.dto"
import { ChatsInDbService } from "./services/chats_in_db/chats_in_db.service";
import { ChatWebsocketFnService } from "./services/chat_websocket_fn/chat_websocket_fn.service";

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
        const userName = client.handshake.headers["username"];

        try {
            if (userName && typeof userName === "string") {
                const user = await this.usersService.getUserByUsernam(userName);
                if (user) {
                    this.connectedUsers.set(user.id, {
                        socket: client,
                        username: user.username,
                        connectedAt: new Date(),
                    });
                }
            }
        } catch (error) {
            console.warn("Invalid username header");
            client.disconnect(true);
            return;
        }
        console.log("New user connected: ", this.connectedUsers);
        this.server.emit('user-joined', client.id);
    }


    handleDisconnect(client: Socket) {
        console.log("New user disconnected: ", client.id);
        this.connectedUsers.delete(client.id);
        this.server.emit('user-left', client.id);
    }

    @SubscribeMessage('message')
    async handlerMessages(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: ChatMessageDto,
    ) {
        const { senderUsername, receiverUsername, message } = data;
        try {
            await this.chatsInDbService.createPersonalMessage({ senderUsername, receiverUsername, message });
            this.chatWebsocketFnService.sendPersonalMessage({ server: this.server, client, message });
        } catch (error) {
            console.error('Error saving message:', error);
            client.emit('createPersonalMessage', 'Failed to send message');
        }
        console.log(`Message from ${client.id}:`, message);
        this.server.emit('eventMessage', message);
    }
}
