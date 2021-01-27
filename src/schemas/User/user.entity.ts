import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

export enum UserRoleEnum {
  ADMIN = 'admin',
  USER = 'user'
}

@Entity('user')
export class UserEntity {

  @ObjectIdColumn() id: ObjectID;
 

  @Column({
    length: 50,
    unique: true
  })
  username: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER
  })
  role: string;

}