import {
  Controller,
  Body,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectModel } from './models/subject.model';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  //Missing guards

  @Get('')
  async getSubjects(): Promise<SubjectModel[]> {
    return await this.subjectService.findAllSubjects();
  }

  @Get('/teacher/:teacherId')
  async getTeacherSubjects(@Param('teacherId') teacherId: string): Promise<SubjectModel[]> {
    return await this.subjectService.getAllSubjectsByTeacherId(teacherId);
  }

  @Get(':id')
  async getSubjectById(@Param('id') id: number) {
    return await this.subjectService.findSubjectById(id);
  }

  //only students should add subjects
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addSubject(
    @Body() newSubject: CreateSubjectDto,
    @Req() request: Request,
  ): Promise<SubjectModel> {
    const student = request.user;
    return await this.subjectService.addSubject(newSubject, student);
  }

  //only students should add subjects
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async validateSubject(@Param('id') id: number) {
    return await this.subjectService.validateSubject(id);
  }
}
