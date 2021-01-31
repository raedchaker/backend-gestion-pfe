import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SoutenanceModel} from "./models/soutenance.model";
import {AjoutSoutenanceDto} from "./DTO/AjoutSoutenance.dto";
import {UpdateSoutenanceDto} from "./DTO/UpdateSoutenance.dto";

@Injectable()
export class SoutenanceService {

    constructor(
        @InjectRepository(SoutenanceModel)
        private readonly SoutenanceRepository: Repository<SoutenanceModel>,
    ) {}

    async findAllSoutenances(): Promise<SoutenanceModel[]> {
        return await this.SoutenanceRepository.find();
    }

    async findSoutenanceById(id: number) {
        const soutenance = await this.SoutenanceRepository.findOne(id);
        if (soutenance) return soutenance;
        throw new NotFoundException(`La soutenance n'est pas disponible`);
    }

    async addSoutenance(newSoutenance: AjoutSoutenanceDto): Promise<SoutenanceModel> {
        const soutenance = this.SoutenanceRepository.create(newSoutenance);
        return await this.SoutenanceRepository.save(soutenance);
    }

    async deleteSoutenance(id: number) {
        return await this.SoutenanceRepository.softDelete(id);
    }

    async restoreSoutenance(id: number) {
        return await this.SoutenanceRepository.restore(id);
    }

    async updateSoutenance(id: string, newSoutenance: UpdateSoutenanceDto): Promise<SoutenanceModel> {
        const soutenance = await this.SoutenanceRepository.preload({
            id: +id,
            ...newSoutenance
        });
        if (!soutenance) {
            new NotFoundException(`La soutenance d'id ${id} n'existe pas`);
        }
        return await this.SoutenanceRepository.save(soutenance);
    }
}
