import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersControler } from './controllers/users.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersControler],
  exports: [UsersService],
})
export class UsersModule { }
