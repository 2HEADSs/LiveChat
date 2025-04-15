import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

type PersonalMessage = {
    senderUsername: string;
    receiverUsername: string,
    message: string;
}
@Injectable()
export class ChatsInDbService {
    constructor(private prisma: PrismaService) { }

    async createPersonalMessage({ senderUsername, receiverUsername, message }: PersonalMessage) {
        const sender = await this.prisma.user.findUnique({ where: { username: senderUsername } });
        const receiver = await this.prisma.user.findUnique({ where: { username: receiverUsername } });

        if (!sender || !receiver) {
            throw new Error("User not found");
        }
        return this.prisma.message.create({
            data: {
                senderId: sender.id,
                receiverId: receiver.id,
                content: message
            },
        })
    }
}
