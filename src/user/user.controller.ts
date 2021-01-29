import { Controller, Get } from '@nestjs/common';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}


  @Get()
  async getAllUsers():Promise<UserModel[]>{
    return await this.userService.getAllUsers(); 
  }



}
