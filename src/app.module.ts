import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectModule } from './subject/subject.module';
import * as dotenv from 'dotenv';
import { UserModule } from './user/user.module';
import { UserModel } from './user/models/user.model';
import { AuthModule } from './auth/auth.module';
import {SoutenanceModule} from "./soutenance/soutenance.module";

dotenv.config();

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      useUnifiedTopology: true,
      type: 'mongodb',
      url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.CLUSTER_NAME}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      entities: ['dist/**/*.model{.ts,.js}'],
      synchronize: true,
    }),
    SubjectModule,
    AuthModule,
      SoutenanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
