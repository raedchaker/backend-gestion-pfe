import { Body, Controller, Get, Post } from '@nestjs/common';
import { UseContainerOptions } from 'class-validator';
import { UserCreateDTO } from '../auth/dto/user-create.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService:UserService
    ){

    }

    @Get()
    testUser(){
        return 'test'
    }
   

}
