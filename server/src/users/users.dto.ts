import { IsNotEmpty, IsString } from "class-validator";


export class UserDto {
    @IsNotEmpty()
    @IsString()
    username: string;
}

export class AllMessagesBetweenTwoUsersDto {
    @IsNotEmpty()
    @IsString()
    senderId: string;

    @IsNotEmpty()
    @IsString()
    receiverId: string;
}

export class ChatRoomDto {
    @IsNotEmpty()
    @IsString()
    ownerId: string;
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @IsString()
    roomName: string;
}