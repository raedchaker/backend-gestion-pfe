import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectModel } from './models/subject.model';

@Module({
  providers: [SubjectService],
  controllers: [SubjectController],
  imports: [TypeOrmModule.forFeature([SubjectModel])],
})
export class SubjectModule {}
