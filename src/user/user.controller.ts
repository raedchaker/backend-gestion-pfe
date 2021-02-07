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

  @Post("search")
  async searchUsers(@Body()search:Partial<UserCreateDTO>):Promise<Partial<UserModel>[]>{
    return await this.userService.searchUses(search)
  }

  @Put(":id")
  async editUser(@Param('id') id , @Body() user){
    return this.userService.updateUser(id,user);
  }

  @Delete(':id')
  async deleteUser(@Param('id')id:ObjectID){
    return  await this.userService.deleteUser(id)
  }

  @Post()
  async getUserByEmail(@Body() email){
    return await this.userService.getUserByEmail(email.email)

  }
  @Get(":id")
  async getUserById(@Param('id') id:ObjectID){
    return this.userService.getUserById(id)

  }



}
