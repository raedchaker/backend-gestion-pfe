import { Controller, Post, Body } from '@nestjs/common';
import { CredentialsDto } from "../auth/credentials.dto";

@Controller('auth')
export class AuthController {

    @Post("login")
    login(
        @Body() credentials: CredentialsDto
    ): Promise<any> {
        return this.authService.login(credentials);
    }

}
