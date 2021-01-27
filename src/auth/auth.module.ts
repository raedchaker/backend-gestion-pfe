import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
// import { UserModule } from '../../schemas/User/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
// import { User, UserSchema } from '../../schemas/User/user.schema';
// import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../schemas/User/user.entity';

import { AuthController } from './auth.controller';

@Module({
  imports: [
    // UserModule,
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: "jwtConstants.secret",
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers : [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}