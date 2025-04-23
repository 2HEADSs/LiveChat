import { useEffect } from 'react';
import { MessageSquareText } from 'lucide-react';
import {
    LoginResponse,
    ChatRoomsResponse,
} from '../types/responseTypes';

import useGetAllUserChatRooms from '../hooks/useGetAllUserChatRooms';

type ChatRoomListProps = {
    chatRooms: ChatRoomsResponse[];
    user: LoginResponse;
    setChatRooms: React.Dispatch<
        React.SetStateAction<ChatRoomsResponse[]>
    >;
};
const ChatRoomList = ({
    chatRooms,
    setChatRooms,
    user,
}: ChatRoomListProps) => {
    useEffect(() => {
        useGetAllUserChatRooms(user.id)
            .then((response) =>
                setChatRooms(response.chatRooms)
            )
            .catch((err) => console.log(err));
    }, []);
    return (
        <div>
            {chatRooms.length > 0 && (
                <>
                    <p className="font-bold text-center">
                        Chat Rooms
                    </p>
                    <div className="flex justify-start cursor-pointer max-w-fit gap-2 flex-col items-start">
                        {chatRooms.map((chatRoom) => (
                            <div
                                className="flex items-center cursor-pointer gap-1 font-bold text-lg"
                                key={chatRoom.id}
                            >
                                <MessageSquareText size="1.25rem" />
                                <p>{chatRoom.name}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ChatRoomList;
