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
import { ChangePasswordDTO } from 'src/auth/dto/change-password.dto';
import { SendMailService } from 'src/generics/send-mail/send-mail.service';
import { Exception } from 'handlebars';
import { UserService } from 'src/user/user.service';
import { IsEmail } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
    private mailService: SendMailService,
    private userService: UserService,
  ) {}

  async login(credentials: LoginUserDto) {
    const { email, password } = credentials;

    const user = await this.userRepository.findOne({ email });

    // console.log(user);

    if (!user) {
      throw new NotFoundException('Verifiez vos coordonnées !');
    } else {
      if (await bcrypt.compare(password, user.password)) {
        const payload = {
          email: user.email,
          role: user.role,
          firstname:user.firstname,
          lastname:user.lastname,
          phone:user.phone,
          cin:user.cin,
          id: user.id,

          
        };
        const jwt = this.jwtService.sign(payload);
        return {
          access_token: jwt,
        };
      } else {
        throw new NotFoundException('Verifiez vos coordonnées !');
      }
    }
  }

  async getStudentByIns(insNumber): Promise<UserModel | boolean> {
    const student = await this.userRepository.findOne({ insNumber });
    //console.log(student)
    return student === undefined ? false : student;
  }

  async register(createUserDto: UserCreateDTO): Promise<Partial<UserModel>> {
    if (
      createUserDto.role == UserRoleEnum.STUDENT &&
      (await this.getStudentByIns(createUserDto.insNumber)) !== false
    ) {
      throw new ConflictException("Numero d'inscription déjà utilisé.");
    }

    const user = await this.userRepository.create({
      ...createUserDto,
    });

    user.salt = await bcrypt.genSalt();

    try {
      try {
        const users = this.userService.searchUses({
          cin: user.cin,
          phone: user.phone,
          email: user.email,
        });
        if ((await users).length !== 0)
          throw new ConflictException("Email et/ou téléphone et/ou CIN déjà utilisé .");
        this.mailService.sendMail(
          user.email,
          `Hello ${user.firstname} ! You can login to the plateform PFE_INSAT using this email adress and ${user.password} as a password . `,
        );
      } catch (e) {
        throw new Exception("Email ne peut pas etre envoyé , et utilisateur non crée ");
      }
      user.password = await bcrypt.hash(user.password, user.salt);
      await this.userRepository.save(user);
    } catch (e) {
      console.log(e);
      throw new ConflictException("Email et/ou téléphone et/ou CIN déjà utilisé .");
    }

    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    };
  }

  async changePassword(changePwdDto: ChangePasswordDTO) {
    const { email, old_pwd, new_pwd, r_new_pwd } = changePwdDto;
    if (new_pwd !== r_new_pwd)
      throw new NotFoundException('Veillez repeter le meme mot de passe !');
    const user = await this.userRepository.findOne({ email: email });
    if (!user) {
      throw new NotFoundException("Utilisateur N'existe pas");
    }

    if (await bcrypt.compare(old_pwd, user.password)) {
      this.mailService.sendMail(
        user.email,
        `Bonjour  ${user.firstname} ! Vous pouvez connnecter à la plateforme PFE-INSAT en  utilisant cet email et  ${new_pwd} comme mot de passe . `,
      );
      user.password = await bcrypt.hash(new_pwd, user.salt);
      this.userRepository.save(user);
      return user;
    } else throw new NotFoundException('Ancien mot de passe est incorrect .');
  }
}
