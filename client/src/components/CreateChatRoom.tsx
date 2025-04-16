import { useState } from 'react';
import {
    ChatRoomsResponse,
    LoginResponse,
} from '../types/responseTypes';
type CreateChatRoomProps = {
    user: LoginResponse;
    setChatRooms: React.Dispatch<
        React.SetStateAction<ChatRoomsResponse[]>
    >;
};
const CreateChatRoom = ({
    user,
    setChatRooms,
}: CreateChatRoomProps) => {
    const [roomName, setRoomName] = useState('');
    const submitHandler = async (roomName: string) => {
        const response = await fetch(
            'http://localhost:3000/users/createChatRoom',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    roomName: roomName,
                    ownerId: user.id,
                    username: user.username,
                }),
            }
        );
        const data = await response.json();
        console.log(data);
        setRoomName('');
        setChatRooms((prevChatRooms) => [
            ...prevChatRooms,
            data,
        ]);
    };

    return (
        <div className="flex items-center justify-center flex-col px-2 py-8 border rounded-xl bg-white">
            <form
                className="flex flex-col items-center gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    submitHandler(roomName);
                }}
            >
                <div className="w-3/4">
                    <label
                        htmlFor="roomName"
                        className="text-xl max-w-2/3 text-start"
                    >
                        {' '}
                    </label>
                    <input
                        className="border w-full pl-1  py-1 border-t-0 border-r-0 border-l-0 border-b-2 border-gray-400 focus:outline-none focus:border-b-2 focus:border-blue-500"
                        value={roomName}
                        name="roomName"
                        onChange={(e) =>
                            setRoomName(e.target.value)
                        }
                        placeholder="RoomName"
                    />
                </div>
                <button
                    type="submit"
                    className="text-xl w-full border py-2 cursor-pointer bg-gradient-to-r bg-gradient-custom animate-gradient text-white"
                >
                    Create Chat
                </button>
            </form>
        </div>
    );
};

export default CreateChatRoom;
