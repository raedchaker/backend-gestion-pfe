import { Timestamp } from 'src/generics/timestamp';
import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { SubjectStatusEnum } from '../enums/subject-status.enum';

//should add relation with student and teacher

@Entity('subject')
export class SubjectEntity extends Timestamp {
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
}
