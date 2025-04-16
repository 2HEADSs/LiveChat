import { useState } from 'react';
import { useLogin } from './hooks/useLogin';
import Login from './components/Login';
import Chat from './components/Chat';
import UserList from './components/UserList';
import { ChatRoomList } from "./components/ChatRoomList";
import { Socket } from 'socket.io-client';
import {
    ChatRoomsResponse,
    LoginResponse,
} from './types/responseTypes';
import CreateChatRoom from './components/CreateChatRoom';

function App() {
    const [socket, setSocket] = useState<Socket | null>(
        null
    );
    const [user, setUser] = useState<LoginResponse | null>(
        null
    );
    const [receiver, setReceiver] =
        useState<LoginResponse | null>(null);
    // const [chatRoom, setChatRoom] = useState<ChatRoomsResponse | null>(null);
    const [chatRooms, setChatRooms] = useState<
        ChatRoomsResponse[]
    >([]);

    const submitHandler = (username: string) => {
        const socketInstance = useLogin(username);
        socketInstance.on('connect', () => {
            console.log(
                'connected to Socket.IO',
                socketInstance.id
            );
            setSocket(socketInstance);
        });

        socketInstance.on(
            'user-info',
            (userData: LoginResponse) => {
                setUser(userData);
            }
        );

        //TODO: add logic to BE
        socketInstance.on('connectedError ', () => {
            console.log('Error connecting to Socket.IO');
        });
    };

    return (
        <div className="flex flex-col border w-full h-screen">
            {user ? (
                <>
                    <div className="flex h-full pt-4 px-4 gap-6">
                        <div className="flex w-fit h-fit flex-col gap-2 py-2 px-4 bg-[#D0E7FF] shadow-lg rounded-lg p-4 border border-white/50">
                            <UserList
                                setReceiver={setReceiver}
                                user={user}
                            />
                            {/* <ChatRoomList user={user} /> */}
                        </div>
                        <div className="flex w-fit h-fit flex-col gap-2 py-2 px-4 bg-[#D0E7FF] shadow-lg rounded-lg p-4 border border-white/50">
                            <CreateChatRoom
                                user={user}
                                setChatRooms={setChatRooms}
                            />
                            <ChatRoomList user={user} />
                        </div>
                        <div className="flex items-end justify-end w-full">
                            {receiver && socket && (
                                <Chat
                                    user={user}
                                    receiver={receiver}
                                    setReceiver={
                                        setReceiver
                                    }
                                    socket={socket}
                                    // setChatRoom={
                                    //     setChatRoom
                                    // }
                                />
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div className="h-full flex justify-center items-center">
                    <Login submitHandler={submitHandler} />
                </div>
            )}
        </div>
    );
}

export default App;
