import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AllMessagesBetweenTwoUsersDto, UserDto } from '../users.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }
    async getAllUser() {
        try {
            return this.prisma.user.findMany();
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve users');
        }
    }
    async createUser(data: UserDto): Promise<{
        id: string;
        username: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }> {
        try {
            const user = await this.prisma.user.create({ data });
            if (!user) {
                throw new Error("Failed to create user");
            }
            return user;
        } catch (error: PrismaClientKnownRequestError | any) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    return this.getUserByUsername(data.username)
                }
                throw new Error("Failed to create user");
            }
            throw new Error("Failed to create user");
        }

    }
    async getUserByUsername(username: string) {
        const user = await this.prisma.user.findUnique({ where: { username } });
        if (!user) throw new Error('User not found');
        return user;
    }

    async getAllMessageBetweenTwoUsers({ senderId, receiverId }: AllMessagesBetweenTwoUsersDto) {
        const messages = await this.prisma.message.findMany(
            {
                where:
                {
                    OR:
                        [{ senderId, receiverId }, { senderId: receiverId, receiverId: senderId }]
                }, orderBy: { createdAt: 'asc' }
            });
        return messages

    }
}
