import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDTO } from 'src/auth/dto/user-create.dto';
import { ObjectID, Repository } from 'typeorm';
import { UserModel } from './models/user.model';

@Injectable()
export class UserService {
  //this function is used to ommit some keys from object 
   omit(keys, obj) {
    if (!keys.length) return obj
    const { [keys.pop()]: omitted, ...rest } = obj;
    return this.omit(keys, rest);
  }
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async getAllUsers():Promise<UserModel[]>{
    const users=await this.userRepository.find()
    const users2=[]
    users.forEach(user=> users2.push(
      this.omit(['password'],user)
    

    ))
    return users2
  }

  async getUserByInsNumber(insNumber: number):Promise<UserModel>{
    return await this.userRepository.findOne({insNumber: insNumber});

  }
  async searchUses(search:Partial<UserCreateDTO>){
    const users = await this.userRepository.find({...search})
  
    return users ;

  }

  
  async deleteUser(id:ObjectID){
    return await this.userRepository.delete(id)  /*soft delete is not supported yet by mongo driver */

  }
}
