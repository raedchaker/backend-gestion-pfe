import { Module } from '@nestjs/common';
import {SoutenanceController} from "./soutenance.controller";
import {SoutenanceService} from "./soutenance.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SoutenanceModel} from "./models/soutenance.model";

@Module({
    controllers:[SoutenanceController],
    providers:[SoutenanceService],
    imports: [TypeOrmModule.forFeature([SoutenanceModel])],
})
export class SoutenanceModule {}
