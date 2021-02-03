import { Module } from '@nestjs/common';
import {SoutenanceController} from "./soutenance.controller";
import {SoutenanceService} from "./soutenance.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SoutenanceModel} from "./models/soutenance.model";
import { SubjectModel } from '../subject/models/subject.model';
import { UserModel } from '../user/models/user.model';

@Module({
    controllers:[SoutenanceController],
    providers:[SoutenanceService],
    imports: [TypeOrmModule.forFeature([SoutenanceModel]),
        TypeOrmModule.forFeature([SubjectModel]),
        TypeOrmModule.forFeature([UserModel])],
})
export class SoutenanceModule {}
