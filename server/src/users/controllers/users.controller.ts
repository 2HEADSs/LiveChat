import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto } from '../create-users.dto';

@Controller('users')
export class UsersControler {

    constructor(private usersService: UsersService) { }

    @Get()
    getAllUsers() {
        return 'Get all users';
    }

    @Post()
    createOrLoginUser(@Body() data: UserDto) {
        console.log(data);
        return this.usersService.createOrLoginUser(data);
    }

}
