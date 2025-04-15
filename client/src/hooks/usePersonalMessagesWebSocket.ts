import { Socket } from "socket.io-client";
type PersonalMessageWebsocket = {
    senderUsername: string;
    receiverUsername: string;
    message: string;
    socket: Socket;
}


export const usePersonalMessagesWebSocket = (
    {senderUsername, receiverUsername, message, socket}: PersonalMessageWebsocket) => {
    socket.emit('sendPersonalMessage', { senderUsername, receiverUsername, message });
}