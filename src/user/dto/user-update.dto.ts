import {
    IsIn,
    IsPhoneNumber,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
  import { UserRoleEnum } from '../../user/models/user.role.enum';
  
  export class UserUpdateDTO {

  
    @IsString({})
    @IsIn([UserRoleEnum.ADMIN, UserRoleEnum.STUDENT, UserRoleEnum.TEACHER])
    role: string;
  
  
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    firstname: string;
  
    @IsPhoneNumber()
    phone: string;
  
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    lastname: string;
  
    //@IsString()
    //password: string;
  }
  