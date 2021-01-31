import {IsDate, IsNotEmpty} from "class-validator";
import {SubjectModel} from "../../subject/models/subject.model";
import {UserModel} from "../../user/models/user.model";
import {SessionModel} from "../../session/models/session.model";

export class AjoutSoutenanceDto {

    @IsDate()
    @IsNotEmpty()
    date: Date;

    @IsNotEmpty()
    sujet: SubjectModel;


    @IsNotEmpty()
    presidentJury: UserModel;

    @IsNotEmpty()
    examinateur: UserModel;

    @IsNotEmpty()
    responsable_INSAT: UserModel;

    @IsNotEmpty()
    session: SessionModel;


}