import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectEntity } from './entities/subject.entity';

@Module({
  providers: [SubjectService],
  controllers: [SubjectController],
  imports: [TypeOrmModule.forFeature([SubjectEntity])],
})
export class SubjectModule {}
