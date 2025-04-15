import { IsNotEmpty, IsString } from 'class-validator';
export class ChatMessageDto {
    @IsNotEmpty()
    @IsString()
    senderUsername: string;

    @IsNotEmpty()
    @IsString()
    receiverUsername: string;

    @IsNotEmpty()
    @IsString()
    message: string;
}