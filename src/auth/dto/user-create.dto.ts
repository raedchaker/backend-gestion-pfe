import {
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoleEnum } from '../../user/models/user.role.enum';

export class UserCreateDTO {
  @IsNumber({})
  cin: number;

  @IsString({})
  @IsIn([UserRoleEnum.ADMIN, UserRoleEnum.STUDENT, UserRoleEnum.TEACHER])
  role: string;

  @IsOptional()
  @IsNumber()
  @MinLength(7)
  insNumber: number;

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

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
