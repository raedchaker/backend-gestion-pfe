import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserCreateDTO } from 'src/auth/dto/user-create.dto';
import { ObjectID } from 'typeorm';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}


  @Get()
  async getAllUsers():Promise<Partial<UserModel>[]>{
    return await this.userService.getAllUsers(); 
  }
  @Get(':insNumber')
  async getUserByInsNumber(@Param('insNumber') insNumber):Promise<Partial<UserModel>>{
    return await this.userService.getUserByInsNumber(+insNumber);
  }
  @Post("search")
  async searchUsers(@Body()search:Partial<UserCreateDTO>):Promise<Partial<UserModel>[]>{
    return await this.userService.searchUses(search)
  }

  @Put(":id")
  async editUser(){
    return 1;
  }

  @Delete(':id')
  async deleteUser(@Param('id')id:ObjectID){
    return  await this.userService.deleteUser(id)
  }



}
