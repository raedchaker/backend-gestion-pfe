import {
  Controller,
  Body,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  Patch,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectModel } from './models/subject.model';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { PdfFileFilter } from 'src/generics/file-upload/file-upload.service';

@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Get('')
  async getSubjects(): Promise<SubjectModel[]> {
    return await this.subjectService.findAllSubjects();
  }

  @Get('/teacher/:teacherId')
  async getTeacherSubjects(@Param('teacherId') teacherId: string): Promise<SubjectModel[]> {
    return await this.subjectService.getAllSubjectsByTeacherId(teacherId);
  }

  @Get('/currentYear')
  async getThisYearSubjects(): Promise<SubjectModel[]> {
    return await this.subjectService.findThisYearSubjects();
  }

  @Get('/currentYear/teacher/:teacherId')
  async getThisYearSubjectsByTeacherId(@Param('teacherId') teacherId: string): Promise<SubjectModel[]> {
    return await this.subjectService.getThisYearSubjectsByTeacherId(teacherId);
  }

  @Get(':id')
  async getSubjectById(@Param('id') id: number) {
    return await this.subjectService.findSubjectById(id);
  }

  @Get('/findByInsNumber/:studentID')
  async getSubjectByStudentId(@Param('studentID') studentID: number) {
    return await this.subjectService.findSubjectByStudentId(studentID);  }

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
  @Patch('validate/:id')
  async validateSubject(@Param('id') id: number) {
    return await this.subjectService.validateSubject(id);
  }

  @Delete(':id')
  deleteSubject(@Param('id') id) {
    return this.subjectService.deleteSubject(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update/:id')
  updateSubject(
    @Body() updatedSubject: CreateSubjectDto,
    @Req() request: Request,
    @Param('id') id,
  ) {
    const student = request.user;
    return this.subjectService.updateSubject(id, student, updatedSubject);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `./files/rapports`,
        filename: (req, file, cb) => {
          const fileNameSPlit = file.originalname.split('.');
          const fileExt = fileNameSPlit[fileNameSPlit.length - 1];
          cb(null, `${uuid()}.${fileExt}`);
        },
      }),
      fileFilter: PdfFileFilter,
    }),
  )
  async uploadRapport(@UploadedFile() file, @Req() request: Request) {
    const student = request.user;
    const filename = file.filename;
    return await this.subjectService.uploadRapport(student, filename);
  }
}
