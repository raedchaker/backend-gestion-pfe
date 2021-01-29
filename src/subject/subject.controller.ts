import { Controller, Body, Get, Param, Post } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectEntity } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  //Missing guards

  @Get('')
  getSubjects(): Promise<SubjectEntity[]> {
    return this.subjectService.findAllSubjects();
  }

  @Get(':id')
  getSubjectById(@Param('id') id: number) {
    return this.subjectService.findSubjectById(id);
  }

  @Post()
  async addSubject(
    @Body() newSubject: CreateSubjectDto,
  ): Promise<SubjectEntity> {
    return await this.subjectService.addSubject(newSubject);
  }
}
