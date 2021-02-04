import { IsDateString, IsMilitaryTime, IsNotEmpty, IsString } from 'class-validator';


export class AjoutSoutenanceDto {

    @IsDateString()
    @IsNotEmpty()
    date: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    heur;

    @IsNotEmpty()
    sujet: string;

    @IsString()
    @IsNotEmpty()
    presidentJury: string;

    @IsString()
    @IsNotEmpty()
    examinateur: string;






}
