import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectEntity } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private readonly SubjectRepository: Repository<SubjectEntity>,
  ) {}

  async findAllSubjects(): Promise<SubjectEntity[]> {
    return await this.SubjectRepository.find();
  }

  async findSubjectById(id: number) {
    const subject = await this.SubjectRepository.findOne(id);
    if (subject) return subject;
    throw new NotFoundException(`Le sujet n'est pas disponible`);
  }

  async addSubject(newSubject: CreateSubjectDto): Promise<SubjectEntity> {
    const subject = this.SubjectRepository.create(newSubject);
    return await this.SubjectRepository.save(subject);
  }
}
