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

    
    
}
