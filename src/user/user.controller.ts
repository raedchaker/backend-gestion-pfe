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
  async editUser(@Param('id') id :ObjectID, @Body() user){
    console.log("debut")
    console.log(id)
    console.log(user)
    console.log("fin")

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
  @Get("get/:id")
  async getUserById(@Param('id') id:ObjectID){
    console.log(id)

    return await this.userService.getUserById(id)

  }



}
