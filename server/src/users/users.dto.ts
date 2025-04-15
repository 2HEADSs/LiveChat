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