import { IsString, IsNotEmpty } from 'class-validator';
export class YearDto {
    @IsString()
    @IsNotEmpty()
    year: string;
}
