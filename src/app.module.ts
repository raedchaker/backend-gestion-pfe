import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthController } from './controllers/auth/auth.controller';
// import { AuthService } from './services/auth/auth.service';

// import { JwtService } from '@nestjs/jwt';
// import { UserModule } from './schemas/User/user.module';
// import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
// import { UserModule } from './schemas/User/user.module';
import { Connection } from 'typeorm';

import * as dotenv from 'dotenv';
// import { AuthController } from './controllers/auth/auth.controller';
// import { UserEntity } from './schemas/User/user.entity';


dotenv.config();


@Module({
  
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.CLUSTER_NAME}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      useNewUrlParser: true, useUnifiedTopology: true
    }),
    // TypeOrmModule.forFeature([UserEntity]),
    // UserModule,
    AuthModule,
    // MongooseModule.forRoot(DB_CONNECT_STRING)
  ],
  controllers: [AppController,],
  providers: [AppService, ],
})
export class AppModule {

  constructor(private connection : Connection) {}

}
