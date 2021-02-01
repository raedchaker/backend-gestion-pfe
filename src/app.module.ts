import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectModule } from './subject/subject.module';
import * as dotenv from 'dotenv';
import { UserModule } from './user/user.module';
import { UserModel } from './user/models/user.model';
import { AuthModule } from './auth/auth.module';
import { CorsMiddleware } from '@nest-middlewares/cors';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    CorsMiddleware.configure(corsOptions);
    consumer.apply(CorsMiddleware).forRoutes('');
  }
}
