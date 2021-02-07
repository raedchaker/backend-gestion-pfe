import { IsEmail, IsNumber, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class UserUpdateDTO {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  firstname: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  lastname: string;

  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;

  @IsNumber({})
  cin: number;
}
