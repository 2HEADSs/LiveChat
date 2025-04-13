import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from '../create-users.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }
    async getAllUser() {
        return this.prisma.user.findMany();
    }
    async createOrLoginUser(data: UserDto) {
        try {
            return this.prisma.user.create({ data });
        } catch (e: unknown) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    return this.prisma.user.findUnique({
                        where: { username: data.username },
                    });
                }
            }

            throw new InternalServerErrorException('Something went wrong');
        }
    }

}
