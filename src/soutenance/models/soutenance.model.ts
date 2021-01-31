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
import {SubjectModel} from "../../subject/models/subject.model";
import {SessionModel} from "../../session/models/session.model";

@Entity('soutenance')
export class SoutenanceModel extends Timestamp{

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    date: Date;

    @OneToOne(
        type => SubjectModel,
        subject => subject.id,
        {

            nullable: true,
            cascade: ['insert', 'update'],
            onDelete: 'SET NULL',
        },
    )
    sujet: SubjectModel;

    @ManyToOne(
        type => UserModel,
        user => user.id,
        {

            nullable: true,
            cascade: ['insert', 'update'],
            onDelete: 'SET NULL',
        },
    )
    presidentJury: UserModel;

    @ManyToOne(
        type => UserModel,
        user => user.id,
        {

            nullable: true,
            cascade: ['insert', 'update'],
            onDelete: 'SET NULL',
        },
    )
    examinateur: UserModel;

    @ManyToOne(
        type => UserModel,
        user => user.id,
        {

            nullable: true,
            cascade: ['insert', 'update'],
            onDelete: 'SET NULL',
        },
    )
    responsable_INSAT: UserModel;

    @ManyToOne(
        type => SessionModel,
        session => session.id,
        {

            nullable: true,
            cascade: ['insert', 'update'],
            onDelete: 'SET NULL',
        },
    )
    session: SessionModel;
}