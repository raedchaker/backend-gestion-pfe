import { IsEmail, IsString } from 'class-validator';
  import { UserRoleEnum } from '../../user/models/user.role.enum';
  
  export class ChangePasswordDTO {
    @IsEmail({})
    email: string;

    @IsString()
    old_pwd: string;

    @IsString()
    new_pwd:string

    @IsString()
    r_new_pwd:string
  }
  