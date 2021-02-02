import {
  Column,
  Entity, ManyToOne,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Timestamp } from '../../generics/Timestamp';
import { SubjectModel } from '../../subject/models/subject.model';
import { SoutenanceModel } from '../../soutenance/models/soutenance.model';
import { SessionModel } from '../../session/models/session.model';

export enum UserRoleEnum {
  ADMIN = 'admin',
  STUDENT = 'student',
  TEACHER = 'teacher',
}

@Entity('users')
export class UserModel extends Timestamp {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({
    unique: true,
  })
  cin: number;

  @Column({
    // unique:true
  })
  insNumber: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    unique: true,
  })
  phone: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
  })
  role: string;

  @OneToOne(
    type => SubjectModel,
    subject => subject.student,
    {

      nullable: true,
      cascade: ['insert', 'update'],
      onDelete: 'SET NULL',
    },
  )
  studentSubject: SubjectModel;

  @OneToMany(
    type => SubjectModel,
    subject => subject.teacher,
    {

      nullable: true,
      cascade: ['insert', 'update'],
      onDelete: 'SET NULL',
    },
  )
  teacherSubject: SubjectModel;

  @OneToMany(
    type => SoutenanceModel,
    soutenance => soutenance,
    {

      nullable: true,
      cascade: ['insert', 'update'],
      onDelete: 'SET NULL',
    },
  )
  soutenances: SoutenanceModel[];

  @OneToMany(
    type => SessionModel,
    session => session.presidentSession,
    {

      nullable: false,
      cascade: ['insert', 'update'],
      onDelete: 'SET NULL',
    },
  )
  sessions: SessionModel[];
}
