import { Timestamp } from 'src/generics/timestamp';
import {UserModel} from 'src/user/models/user.model';
import {
    Column,
    Entity,
    ObjectIdColumn,
    ObjectID,
    ManyToOne, OneToMany,
} from 'typeorm';
import {SoutenanceModel} from "../../soutenance/models/soutenance.model";
import {NomSallesEnum} from "../enums/nom-salles.enum";


@Entity('session')
export class SessionModel extends Timestamp{

    @ObjectIdColumn()
    id: ObjectID;

    @Column({
        type: 'enum',
        enum: NomSallesEnum,
    })
    salle: string;

    @ManyToOne(
        type => UserModel,
        user => user.sessions,
        {

            nullable: false,
            cascade: ['insert', 'update'],
            onDelete: 'SET NULL',
        },
    )
    presidentSession: UserModel;

    @OneToMany(
        type => SoutenanceModel ,
            soutenance => soutenance.id
        ,{

            nullable: false,
            cascade: ['insert', 'update'],
            onDelete: 'SET NULL',
        },)
    soutenances: SoutenanceModel[];
}