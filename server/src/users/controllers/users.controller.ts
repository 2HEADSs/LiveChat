import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto } from '../create-users.dto';

@Controller('users')
export class UsersControler {

    constructor(private usersService: UsersService) { }

    @Get()
    getAllUsers() {
        return this.usersService.getAllUser();
    }

    @Post()
    createUser(@Body() data: UserDto) {
        console.log(data);
        return this.usersService.createUser(data);
    }

}
