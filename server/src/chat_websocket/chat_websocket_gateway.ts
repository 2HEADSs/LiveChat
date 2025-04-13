import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway(3001, { cors: '*' })
export class ChatWebsocketGateway {
    @SubscribeMessage('message')
    handlerMessages(@MessageBody() message: string) {
        console.log(message);
    }
}