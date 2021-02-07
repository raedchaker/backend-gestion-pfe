import { IsOptional } from 'class-validator';
import { CollegeYearModel } from 'src/college-year/models/college-year.model';
import { Timestamp } from 'src/generics/timestamp';
import { UserModel } from 'src/user/models/user.model';
import {
  Column,
  Entity,
  ObjectIdColumn,
  ObjectID,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { SubjectStatusEnum } from '../enums/subject-status.enum';

//should add relation with student and teacher

@Entity('subject')
export class SubjectModel extends Timestamp {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({
    length: 50,
  })
  title: string;

  @Column({
    length: 50,
  })
  enterprise: string;

  @Column({
    length: 255,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: SubjectStatusEnum,
    default: SubjectStatusEnum.waiting,
  })
  status: SubjectStatusEnum = SubjectStatusEnum.waiting;

  @Column({
    length: 255,
  })
  rapport: string;

  @Column({
    length: 255,
  })
  student: string;

  @Column({
    length: 255,
  })
  teacher: string;

  @Column({
    length: 255,
  })
  year: string;
}
