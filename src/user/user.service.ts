import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDTO } from '../auth/dto/user-create.dto';
import { UserModel } from './models/user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserModel) 
        private readonly userRepository:Repository<UserModel>
    ){

    }

    findUserByCIn(cin){
        const user= this.userRepository.findOne({cin})
        return user ===null?false:user
    }
    //find user by email : if existed return user : else return false
    findUserByMail(email){
        const user = this.userRepository.findOne({
            email
        })

        if(user!==null ) 
        return user
        return false
    }
    //find user by phone : if existed return user :else return false
    findUserByPhone(phone){
        const user = this.userRepository.findOne({
            phone
        })
        if (user!==null)
        return user 
        return false
    }
    //find student : if existed return student :else false 

    addUser(user:UserCreateDTO){
return 
      
    }
}
