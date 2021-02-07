import { YearDto } from './dto/year-dto';
import { CollegeYearModel } from 'src/college-year/models/college-year.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectModel } from '../subject/models/subject.model';
import { Repository } from 'typeorm';

@Injectable()
export class CollegeYearService {

    constructor(
        @InjectRepository(SubjectModel)
        private readonly SubjectRepository: Repository<SubjectModel>,
        @InjectRepository(CollegeYearModel)
        private readonly CollegeYearRepository: Repository<CollegeYearModel>,
    ) { }

    async findAllYears() {
        return await this.CollegeYearRepository.find();
    }

    async findYearById(id: string) {
        const year = await this.CollegeYearRepository.findOne({ id });
        if (year) {
            return year;
        }
        throw new NotFoundException(`L'annee d'id ${id} n'est pas disponible`);
    }

    async deleteYear(id: string) {
        return await this.CollegeYearRepository.delete(id);
    }

    async addYear(newYear: YearDto): Promise<CollegeYearModel> {
        const year = this.CollegeYearRepository.create(newYear);
        return await this.CollegeYearRepository.save(year);
    }
}