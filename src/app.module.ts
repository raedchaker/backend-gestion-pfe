import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectModule } from './subject/subject.module';
import * as dotenv from 'dotenv';
import { UserModule } from './user/user.module';
import { UserModel } from './user/models/user.model';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SendMailService } from './generics/send-mail/send-mail.service';
import { FileUploadService } from './generics/file-upload/file-upload.service';
import { CorsMiddleware } from '@nest-middlewares/cors';
import {SoutenanceModule} from "./soutenance/soutenance.module";
import { CollegeYearModule } from './college-year/college-year.module';

dotenv.config();

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

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
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_ID, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
        },
      },
      defaults: {
        from: '"nest-modules" <ne5demwn5adem@outlook.fr>', // outgoing email ID
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
    SoutenanceModule,
      SoutenanceModule,
      CollegeYearModule
  ],
  controllers: [AppController],
  providers: [AppService, FileUploadService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    CorsMiddleware.configure(corsOptions);
    consumer.apply(CorsMiddleware).forRoutes('');
  }
}
