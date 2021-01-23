import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../../schemas/User/create-user.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/User/user.schema';

import * as bcrypt from 'bcrypt';

import { LoginUserDto } from '../../schemas/User/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async login(credentials: LoginUserDto) {

    const {username, password} = credentials;

    const user = await this.userModel.findOne({username});

 
      if(!user) {
 
        throw new NotFoundException('username ou password erroné');
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