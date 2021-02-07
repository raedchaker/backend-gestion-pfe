import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  // Allow only images
}

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const PdfFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(pdf)$/)) {
      return callback(
        new HttpException(
          'Only pdf files are allowed!',
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
    callback(null, true);
  };


export const fileFilter = (req, file, callback) => {

    callback(null, true);
  };

