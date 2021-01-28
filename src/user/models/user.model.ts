import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { Timestamp } from "../../generics/Timestamp";

export enum UserRoleEnum {
    ADMIN = 'admin',
    STUDENT = 'student',
    TEACHER = 'teacher'
  }

@Entity('users')
export class UserModel extends Timestamp {
    @ObjectIdColumn() 
    id: ObjectID

    @Column({
        unique:true
    })
    cin:number;

    @Column({
       // unique:true
    })
    insNumber:number;

    @Column()
    firstname:string;

    @Column()
    lastname:string;

    @Column({
        unique:true
    })
    email:string;

    @Column()
    password:string; 

    @Column()
    salt:string;

    @Column({
        unique:true
    })
    phone:string

    @Column({
        type:'enum',
        enum:UserRoleEnum

    })
    role:string;

}