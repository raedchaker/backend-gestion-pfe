import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config()
@Injectable()
export class AppService {
  getHello(): string {
    console.log(process.env.cc)
    return 'Hello World!';
  }
}
