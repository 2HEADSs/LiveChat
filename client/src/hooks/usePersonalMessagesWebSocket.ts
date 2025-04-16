import { Socket } from "socket.io-client";
import { useEffect } from "react";
import { MessageResponse } from "../types/responseTypes";
type PersonalMessageWebsocket = {
    setMessages: React.Dispatch<React.SetStateAction<MessageResponse[]>>;
    socket: Socket;
}


export const usePersonalMessagesWebSocket = (
    { socket, setMessages }: PersonalMessageWebsocket) => {
    useEffect(() => {
        const handler = (data: MessageResponse) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        }
        socket.on('receivedPersonalMessage', handler);
        return () => {
            socket.off('receivedPersonalMessage', handler);
        }
    }, [socket])
}
