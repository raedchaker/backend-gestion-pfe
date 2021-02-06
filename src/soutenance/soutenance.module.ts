import { Module } from '@nestjs/common';
import { SoutenanceService } from './soutenance.service';
import { SoutenanceController } from './soutenance.controller';
import {TypeOrmModule} from "@nestjs/typeorm";

import {SubjectModel} from "../subject/models/subject.model";
import {UserModel} from "../user/models/user.model";
import {SoutenanceModel} from "./model/soutenance.model";

@Module({
  providers: [SoutenanceService],
  controllers: [SoutenanceController],
  imports: [TypeOrmModule.forFeature([SoutenanceModel]),
    TypeOrmModule.forFeature([SubjectModel]),
    TypeOrmModule.forFeature([UserModel])],
})
export class SoutenanceModule {}
