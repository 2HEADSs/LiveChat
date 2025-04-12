import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../create-users.dto';

@Controller('users')
export class UsersControler {

    constructor(private usersService: UsersService) { }

    @Get()
    getAllUsers() {
        return 'Get all users';
    }
    @Post()
    createUser(@Body() data: CreateUserDto) {
        return this.usersService.createUser(data);
    }

}
