import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDto } from "../schemas/User/login-user.dto";
import { AuthService } from "./auth.service";
import { CreateUserDto } from 'src/schemas/User/create-user.dto';

@Controller('auth')
export class AuthController {


    constructor(
        private authService : AuthService 
    ){}
    @Post("login")
    login(
        @Body() credentials: LoginUserDto
    ): Promise<any> {

        return this.authService.login(credentials);
    }

    @Post("register")
    register(
        @Body() createUserDto: CreateUserDto
    ): Promise<any> {

        return this.authService.register(createUserDto);
    }

}
