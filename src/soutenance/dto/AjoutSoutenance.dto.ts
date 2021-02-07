import { IsDateString, IsMilitaryTime, IsNotEmpty, IsString } from 'class-validator';


export class AjoutSoutenanceDto {

    @IsDateString()
    @IsNotEmpty()
    date: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    heur;

    @IsNotEmpty()
    insNumber: number;

    @IsString()
    @IsNotEmpty()
    presidentJury: string;

    @IsString()
    @IsNotEmpty()
    examinateur: string;






}
