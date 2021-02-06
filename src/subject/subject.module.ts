import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectModel } from './models/subject.model';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { UserModel } from 'src/user/models/user.model';

@Module({
  providers: [SubjectService, UserService],
  controllers: [SubjectController],
  imports: [
    TypeOrmModule.forFeature([SubjectModel]),
    TypeOrmModule.forFeature([UserModel]),
  ],
})
export class SubjectModule {}
