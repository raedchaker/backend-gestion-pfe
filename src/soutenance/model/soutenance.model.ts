import { Timestamp } from 'src/generics/timestamp';
import {
    Column,
    Entity,
    ObjectIdColumn,
    ObjectID,
} from 'typeorm';


@Entity('soutenance')
export class SoutenanceModel extends Timestamp{

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    date: Date;

    @Column('time', {name: 'heur'})
    heur: Date;

    @Column({length:255,})
    sujet: string;

    @Column({length:255,})
    presidentJury: string;

    @Column({length:255,})
    examinateur: string;

}
