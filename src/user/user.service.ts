import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDTO } from 'src/auth/dto/user-create.dto';
import { Repository } from 'typeorm';
import { UserModel } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async getAllUsers():Promise<UserModel[]>{
    return await this.userRepository.find()
  }

  async searchUses(search:Partial<UserCreateDTO>){
  
    return {...search }

  }
}
