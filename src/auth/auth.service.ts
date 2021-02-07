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

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
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
          role: user.role,
          id: user.id
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

    user.password = await bcrypt.hash(user.password, user.salt);
    try {
      await this.userRepository.save(user);
    } catch (e) {
      console.log(e);
      throw new ConflictException(`duplicate email or cin or phone `);
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
