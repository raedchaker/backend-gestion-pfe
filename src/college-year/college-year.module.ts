import { UserModel } from './../user/models/user.model';
import { SubjectService } from './../subject/subject.service';
import { SubjectModel } from './../subject/models/subject.model';
import { CollegeYearModel } from 'src/college-year/models/college-year.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CollegeYearController } from './college-year.controller';
import { CollegeYearService } from './college-year.service';

@Module({
  controllers: [CollegeYearController],
  providers: [CollegeYearService, SubjectService],
  imports: [
    TypeOrmModule.forFeature([CollegeYearModel]),
    TypeOrmModule.forFeature([SubjectModel]),
    TypeOrmModule.forFeature([UserModel])
  ]
})
export class CollegeYearModule {}
