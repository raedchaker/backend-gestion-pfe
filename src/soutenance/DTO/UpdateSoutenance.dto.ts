import {IsDate, IsNotEmpty, IsOptional} from "class-validator";
import {SubjectModel} from "../../subject/models/subject.model";
import {UserModel} from "../../user/models/user.model";
import {SessionModel} from "../../session/models/session.model";

export class UpdateSoutenanceDto{
    @IsDate()
    @IsNotEmpty()
    @IsOptional()
    date: Date;

    @IsNotEmpty()
    @IsOptional()
    sujet: SubjectModel;


    @IsNotEmpty()
    @IsOptional()
    presidentJury: UserModel;

    @IsNotEmpty()
    @IsOptional()
    examinateur: UserModel;

    @IsNotEmpty()
    @IsOptional()
    responsable_INSAT: UserModel;

    @IsNotEmpty()
    @IsOptional()
    session: SessionModel;

}