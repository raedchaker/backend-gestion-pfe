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

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    sujet: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    presidentJury: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    examinateur: string;






}
