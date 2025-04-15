import { Body, Controller, Get, InternalServerErrorException, Post, Query } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { AllMessagesBetweenTwoUsersDto, UserDto } from '../users.dto';

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

    @Get('personalMessages')
    async getPersonalMessages(@Query() data: AllMessagesBetweenTwoUsersDto) {
        try {
            return await this.usersService.getAllMessageBetweenTwoUsers(data);
        } catch {
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

}
