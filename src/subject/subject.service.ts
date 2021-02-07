import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectModel } from './models/subject.model';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UserModel } from 'src/user/models/user.model';

import { SubjectStatusEnum } from './enums/subject-status.enum';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectModel)
    private readonly SubjectRepository: Repository<SubjectModel>,
    @InjectRepository(UserModel)
    private readonly UserRepository: Repository<UserModel>,
  ) {}

  async findAllSubjects() {
    const full_subjects = [];
    const subjects = await this.SubjectRepository.find();
    for (var i = 0; i < subjects.length; i++) {
      const student = await this.UserRepository.findOne(subjects[i].student);

      if (!subjects[i].teacher) {
        full_subjects.push({ ...subjects[i], student });
      } else {
        const teacher = await this.UserRepository.findOne(subjects[i].teacher);
        full_subjects.push({ ...subjects[i], teacher, student });
      }
    }
    /*  subjects.forEach(async subject => {
      const student = await this.SubjectRepository.findOne(subject.student);
      const teacher = await this.SubjectRepository.findOne(subject.teacher);
      full_subjects.push({ ...subject, teacher, student });
    });*/
    return full_subjects;
  }

  async findThisYearSubjects() {
    const d = new Date();
    let year = d.getFullYear();
    if(d.getMonth()>10) year++;
    const full_subjects = [];
    let subjects = await this.SubjectRepository.find();
    subjects = subjects.filter(s => s.year == year.toString() )
    for (var i = 0; i < subjects.length; i++) {
      const student = await this.UserRepository.findOne(subjects[i].student);

      if (!subjects[i].teacher) {
        full_subjects.push({ ...subjects[i], student });
      } else {
        const teacher = await this.UserRepository.findOne(subjects[i].teacher);
        full_subjects.push({ ...subjects[i], teacher, student });
      }
    }
    /*  subjects.forEach(async subject => {
      const student = await this.SubjectRepository.findOne(subject.student);
      const teacher = await this.SubjectRepository.findOne(subject.teacher);
      full_subjects.push({ ...subject, teacher, student });
    });*/
    return full_subjects;
  }

  async findSubjectById(id: number) {
    const subject = await this.SubjectRepository.findOne(id);
    if (subject) {
      const teacher = await this.UserRepository.findOne(subject.teacher);
      const student = await this.UserRepository.findOne(subject.student);
      const full_object = { ...subject, teacher, student };
      return full_object;
    }
    throw new NotFoundException(`Le sujet n'est pas disponible`);
  }

  async validateSubject(id: number) {
    const modified = await this.SubjectRepository.update(id, {
      status: SubjectStatusEnum.valid,
    });
    return await this.SubjectRepository.findOne({
      id: id,
    });
  }

  async addSubject(
    newSubject: CreateSubjectDto,
    student,
  ): Promise<SubjectModel> {
    const teacher = await this.UserRepository.findOne({
      email: newSubject.teacher,
    });
    if (!teacher || teacher.role !== 'teacher') {
      throw new NotFoundException('email enseignant inexistant');
    }
    const newSub = {
      title: newSubject.title,
      enterprise: newSubject.enterprise,
      description: newSubject.description,
    };
    const subject = this.SubjectRepository.create(newSub);
    subject.teacher = teacher.id.toString();
    subject.student = student.id.toString();
    return await this.SubjectRepository.save(subject);
  }


  async getAllSubjectsByTeacherId(teacherId: string): Promise<SubjectModel[]>{
    const full_subjects = [];
    const subjects = await this.SubjectRepository.find({teacher: teacherId});
    for (var i = 0; i < subjects.length; i++) {
      const student = await this.UserRepository.findOne(subjects[i].student);

      if (!subjects[i].teacher) {
        full_subjects.push({ ...subjects[i], student });
      } else {
        const teacher = await this.UserRepository.findOne(subjects[i].teacher);
        full_subjects.push({ ...subjects[i], teacher, student });
      }
    }
    return full_subjects;
  }

  async getThisYearSubjectsByTeacherId(teacherId: string): Promise<SubjectModel[]>{
    const d = new Date();
    let year = d.getFullYear();
    if(d.getMonth()>10) year++;
    const full_subjects = [];
    let subjects = await this.SubjectRepository.find({teacher: teacherId});
    subjects = subjects.filter(s => s.year == year.toString() )
    for (var i = 0; i < subjects.length; i++) {
      const student = await this.UserRepository.findOne(subjects[i].student);

      if (!subjects[i].teacher) {
        full_subjects.push({ ...subjects[i], student });
      } else {
        const teacher = await this.UserRepository.findOne(subjects[i].teacher);
        full_subjects.push({ ...subjects[i], teacher, student });
      }
    }
    return full_subjects;
  }

  async deleteSubject(id: number) {
    return await this.SubjectRepository.delete(id);
  }

  async updateSubject(
    id,
    student,
    updatedSubject: CreateSubjectDto,
  ): Promise<SubjectModel> {
    const teacher = await this.UserRepository.findOne({
      email: updatedSubject.teacher,
    });
    if (!teacher || teacher.role !== 'teacher') {
      throw new NotFoundException('email enseignant inexistant');
    }
    const newSub = {
      title: updatedSubject.title,
      enterprise: updatedSubject.enterprise,
      description: updatedSubject.description,
      teacher: teacher.id.toString(),
      student: student.id.toString(),
    };

    const subjectToBeModified = await this.SubjectRepository.findOne(id);
    const subject = await this.SubjectRepository.preload({
      id: subjectToBeModified.id,
      ...newSub,
    });

    return await this.SubjectRepository.save(subject);
  }

  async uploadRapport(student, filename) {
    const subject = await this.SubjectRepository.findOne({
      student: student.id.toString(),
    });
    await this.SubjectRepository.update(subject.id.toString(), {
      rapport: filename,
    });
    return await this.SubjectRepository.findOne(subject.id.toString());
  }
}
