import {IsDateString, IsMilitaryTime, IsNotEmpty, IsOptional, IsString} from 'class-validator';


export class UpdateSoutenanceDto {

    @IsDateString()
    @IsNotEmpty()
    @IsOptional()
    date: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    @IsOptional()
    heur;


    @IsNotEmpty()
    @IsOptional()
    insNumber: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    nom_presidentJury: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    nom_examinateur: string;


    @IsNotEmpty()
    @IsOptional()
    presidentJury: string;


    @IsNotEmpty()
    @IsOptional()
    examinateur: string;

    @IsNotEmpty()
    @IsOptional()
    sujet: string;



}
