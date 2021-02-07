import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exception } from 'handlebars';
import { UserCreateDTO } from 'src/auth/dto/user-create.dto';
import { ObjectID, Repository } from 'typeorm';
import { UserUpdateDTO } from './dto/user-update.dto';
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


  async getUserByEmail(email){
    const user = await this.userRepository.findOne({ email });
    if(!user)
    throw new NotFoundException("Utilisateur n'existe pas");
    else return user
  }

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

  async getUserById(id:ObjectID){
    return await this.userRepository.findOne(id)
  }

  async updateUser(id:ObjectID,updateUser:UserUpdateDTO){
    const user=await this.userRepository.findOne(id)
    if(!user){
      throw new NotFoundException("Utilisateur n'existe pas")
    }

    if(user.cin !==updateUser.cin){
     const  user_cin=this.userRepository.findOne({cin:updateUser.cin})
     if(user_cin){
       throw new BadRequestException("Cin est déjà utilisé")
     }
    }
    if(user.email !==updateUser.email){
      const  user_email=this.userRepository.findOne({email:updateUser.email})
      if(user_email){
        throw new BadRequestException("Email est deja utilisé")
      }
     }
     if(user.phone !==updateUser.phone){
      const  user_phone=this.userRepository.findOne({phone:updateUser.phone})
      if(user_phone){
        throw new BadRequestException("Télèphone est déjà utilisé")
      }
     }
    user.firstname=updateUser.firstname
    user.lastname=updateUser.lastname

    this.userRepository.save(user)
    return user
  }
}
