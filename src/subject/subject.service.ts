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

  async findAllSubjects(): Promise<SubjectModel[]> {
    return await this.SubjectRepository.find();
  }

  async findSubjectById(id: number) {
    const subject = await this.SubjectRepository.findOne(id);
    if (subject) return subject;
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
      throw new NotFoundException('email inexistant');
    }
    const newSub = {
      title: newSubject.title,
      enterprise: newSubject.enterprise,
      description: newSubject.description,
    };
    const subject = this.SubjectRepository.create(newSub);
    subject.teacher = teacher;
    subject.student = student;
    return await this.SubjectRepository.save(subject);
  }
}
