import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { UserModel, UserRoleEnum } from 'src/user/models/user.model';
import { LoginUserDto } from './dto/user-login.dto';
import { UserCreateDTO } from 'src/auth/dto/user-create.dto';
import { SendMailService } from 'src/generics/send-mail/send-mail.service';
import { Exception } from 'handlebars';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
    private mailService:SendMailService,
    private userService:UserService
  ) {}


  async login(credentials: LoginUserDto) {
    const { email, password } = credentials;

    const user = await this.userRepository.findOne({ email });

    // console.log(user);

    if (!user) {
      throw new NotFoundException("User doesn't exist");
    } else {
      if (await bcrypt.compare(password, user.password)) {
        const payload = {
          email: user.email,
          role: user.role
        };
        const jwt = this.jwtService.sign(payload);
        return {
          access_token: jwt,
        };
      } else {
        throw new NotFoundException('Wrong credentials');
      }
    }
  }

  async getStudentByIns(insNumber): Promise<UserModel | boolean> {
    const student = await this.userRepository.findOne({insNumber});
    //console.log(student)
    return student === undefined ? false : student;
  }

  async register(createUserDto: UserCreateDTO): Promise<Partial<UserModel>> {
    if (
      createUserDto.role == UserRoleEnum.STUDENT &&
      (await this.getStudentByIns(createUserDto.insNumber)) !== false
    ) {
      throw new ConflictException(`Inscription number already used`);
    }

    const user = await this.userRepository.create({
      ...createUserDto,
    });

    user.salt = await bcrypt.genSalt();
    

    
    try {
        try{
          const users=this.userService.searchUses({
           cin: user.cin,
            phone:user.phone,
           email:user.email
          })
          if((await users).length !==0)
          throw new ConflictException(`Duplicate email or cin or phone `);
          this.mailService.sendMail(user.email,`Hello ${user.firstname } ! You can login to the plateform PFE_INSAT using this email adress and ${user.password} as a password . `)
        }
      catch(e){
        throw new Exception("Mail can't be sent , user not created")
      }
      user.password = await bcrypt.hash(user.password, user.salt);
      await this.userRepository.save(user);
    } catch (e) {
      console.log(e);
      throw new ConflictException(`Duplicate email or cin or phone `);
    }

    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    };
  }
}
