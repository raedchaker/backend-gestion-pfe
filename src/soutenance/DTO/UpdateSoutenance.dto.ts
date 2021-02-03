import { IsDateString, IsMilitaryTime, IsNotEmpty, IsOptional } from 'class-validator';
import {SubjectModel} from "../../subject/models/subject.model";
import {UserModel} from "../../user/models/user.model";
import {SessionModel} from "../../session/models/session.model";

export class UpdateSoutenanceDto{
    @IsDateString()
    @IsNotEmpty()
    @IsOptional()
    date: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    @IsOptional()
    heur: Date;

    @IsNotEmpty()
    @IsOptional()
    sujet: string;


    @IsNotEmpty()
    @IsOptional()
    presidentJury: string;

    @IsNotEmpty()
    @IsOptional()
    examinateur: string;


}