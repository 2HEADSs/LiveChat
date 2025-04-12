import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../create-users.dto';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }
    async getAllUser() {
        return this.prisma.user.findMany();
    }
    async createUser(data: CreateUserDto) {
        return this.prisma.user.create({ data });
    }

}
