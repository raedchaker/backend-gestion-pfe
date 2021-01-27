import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../schemas/User/create-user.dto';

// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
// import { User, UserDocument } from '../schemas/User/user.schema';


import { UserEntity } from '../schemas/User/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { LoginUserDto } from '../schemas/User/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private userRepository : Repository<UserEntity>
    // @InjectModel(User.name)
    // private userModel: Model<UserDocument>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<Partial<UserEntity>> {
    const user = await this.userRepository.create({
      ...createUserDto
    });

    user.salt = await bcrypt.genSalt();

    user.password = await bcrypt.hash(user.password, user.salt);
    try{
      await this.userRepository.save(user);
    } catch (e) {
      throw new ConflictException(`duplicate email or username`);
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role : user.role,
    };
  }

  async login(credentials: LoginUserDto) {

    const {username, password} = credentials;

    const user = await this.userRepository.findOne({username});
    
    // console.log(user);
    
      if(!user) {
 
        throw new NotFoundException("User doesn't exist");
      } else {
        
        if ( await bcrypt.compare(password, user.password)) {
          const payload = {
            username: user.username,
            email: user.email,
          }
          const jwt = this.jwtService.sign(payload);
          return  {
            "access_token" : jwt
          }
        } else {
          throw new NotFoundException('Wrong credentials');
        }
      }
  }
}