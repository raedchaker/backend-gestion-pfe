import { Body, Controller, HttpStatus, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserCreateDTO } from 'src/auth/dto/user-create.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/user-login.dto';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { PdfFileFilter } from 'src/generics/file-upload/file-upload.service';



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: UserCreateDTO): Promise<any> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() credentials: LoginUserDto): Promise<any> {
    console.log(credentials);

    return this.authService.login(credentials);
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `./files`,
        filename: (req, file, cb) => {
          const fileNameSPlit = file.originalname.split('.');
          const fileExt = fileNameSPlit[fileNameSPlit.length - 1];
          cb(null, `${uuid()}.${fileExt}`);
        },
      }),
      fileFilter: PdfFileFilter,
    }),
  )
  uploadImage(@UploadedFile() file, @Res() res) {
    res.status(HttpStatus.ACCEPTED).send({ fileName: file.filename });
  }

}
