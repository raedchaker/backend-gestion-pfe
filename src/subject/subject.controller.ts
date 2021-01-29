import { Controller, Body, Get, Param, Post } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectModel } from './models/subject.model';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  //Missing guards

  @Get('')
  getSubjects(): Promise<SubjectModel[]> {
    return this.subjectService.findAllSubjects();
  }

  @Get(':id')
  getSubjectById(@Param('id') id: number) {
    return this.subjectService.findSubjectById(id);
  }

  @Post()
  async addSubject(
    @Body() newSubject: CreateSubjectDto,
  ): Promise<SubjectModel> {
    return await this.subjectService.addSubject(newSubject);
  }
}
