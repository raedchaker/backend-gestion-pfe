import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDTO } from 'src/auth/dto/user-create.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: UserCreateDTO): Promise<any> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() credentials: LoginUserDto): Promise<any> {
    console.log(credentials);

    return this.authService.login(credentials);
  }
}
