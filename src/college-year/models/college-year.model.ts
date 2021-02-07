import { SubjectModel } from './../../subject/models/subject.model';
import { Timestamp } from 'src/generics/timestamp';
import { UserModel } from 'src/user/models/user.model';
import {
  Column,
  Entity,
  ObjectIdColumn,
  ObjectID,
  OneToOne,
  ManyToOne,
  OneToMany,
} from 'typeorm';

//should add relation with student and teacher

@Entity('college-year')
export class CollegeYearModel extends Timestamp {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({
    length: 10,
    unique: true
  })
  year: string;

  // @OneToMany(
  //     type => SubjectModel,
  //     subject => subject.year,
  //     {
  //         nullable: true,
  //         cascade: true
  //     }
  //      )
  // subject: SubjectModel[];
}
