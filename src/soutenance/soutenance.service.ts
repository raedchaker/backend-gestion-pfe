import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import {SoutenanceModel} from "./models/soutenance.model";
import {AjoutSoutenanceDto} from "./DTO/AjoutSoutenance.dto";
import {UpdateSoutenanceDto} from "./DTO/UpdateSoutenance.dto";
import { AuthGuard } from '@nestjs/passport';
import { UserModel } from '../user/models/user.model';
import { SubjectModel } from '../subject/models/subject.model';

@Injectable()
export class SoutenanceService {

    constructor(
        @InjectRepository(SoutenanceModel)
        private readonly SoutenanceRepository: Repository<SoutenanceModel>,
        @InjectRepository(UserModel)
        private readonly UserRepository: Repository<UserModel>,
        @InjectRepository(SubjectModel)
        private readonly SubjectRepository: Repository<SubjectModel>,

    ) {}

    async findAllSoutenances(): Promise<SoutenanceModel[]> {
        return await this.SoutenanceRepository.find();
    }

    async findSoutenanceById(id) {
        const soutenance = ObjectID.isValid(id) && await this.SoutenanceRepository.findOne(id);
        console.log('la soutenance',soutenance);
        if (!soutenance) {
          throw new NotFoundException(`La soutenance n'est pas disponible`);
        }

      return soutenance;
    }
    async findSoutenanceByStudentNumber(id: number) {
        const student = await this.UserRepository.findOne(id);
        const subject = await this.SubjectRepository.findOne({student : student})
        const soutenance = await this.SoutenanceRepository.findOne({sujet : subject});
        if (soutenance) return soutenance;
        throw new NotFoundException(`La soutenance n'est pas disponible`);
    }
    //only administrator can add soutenance
   // @UseGuards(AuthGuard('jwt'))
    async addSoutenance(
      newSoutenance: AjoutSoutenanceDto
      ) : Promise <SoutenanceModel>
       {
        const sujet = await this.SubjectRepository.findOne({title: newSoutenance.sujet},);
        const presidentJury = await this.UserRepository.findOne({email : newSoutenance.presidentJury},);
        const examinateur = await this.UserRepository.findOne({email : newSoutenance.examinateur},);

           if (!presidentJury || presidentJury.role !== 'teacher') {
               throw new NotFoundException( `email du president de Jury n'existe pas ou ne represente pas un enseignant `);
           }
           if (!examinateur || examinateur.role !== 'teacher') {
               throw new NotFoundException('email du president de examinateur n\'existe pas ou ne represente pas un enseignant');
           }
           if (!sujet ) {
               throw new NotFoundException('le sujet  n\'existe pas');
           }
        const newSoutenanceinstance ={
               date : newSoutenance.date,
               heur : newSoutenance.heur};
        const soutenance = this.SoutenanceRepository.create(newSoutenanceinstance);
        soutenance.examinateur = examinateur;
        soutenance.presidentJury = presidentJury;
        soutenance.sujet = sujet;


        return await this.SoutenanceRepository.save(soutenance);

    }

    async deleteSoutenance(id: number) {
        return await this.SoutenanceRepository.softDelete(id);
    }

    async restoreSoutenance(id: number) {
        return await this.SoutenanceRepository.restore(id);
    }


    // still not working convinently
    async updateSoutenance(id_old, newSoutenance: UpdateSoutenanceDto): Promise<SoutenanceModel> {

      const sujet = await this.SubjectRepository.findOne({title: newSoutenance.sujet},);
      const presidentJury = await this.UserRepository.findOne({email : newSoutenance.presidentJury},);
      const examinateur = await this.UserRepository.findOne({email : newSoutenance.examinateur},);

      if (!presidentJury || presidentJury.role !== 'teacher') {
        throw new NotFoundException( `email du president de Jury n'existe pas ou ne represente pas un enseignant `);
      }
      if (!examinateur || examinateur.role !== 'teacher') {
        throw new NotFoundException('email du president de examinateur n\'existe pas ou ne represente pas un enseignant');
      }
      if (!sujet ) {
        throw new NotFoundException('le sujet  n\'existe pas');
      }
      const newSoutenanceinstance ={
        date : newSoutenance.date,
        heur : newSoutenance.heur};
      const soutenance_updated = this.SoutenanceRepository.create(newSoutenanceinstance);
      soutenance_updated.examinateur = examinateur;
      soutenance_updated.presidentJury = presidentJury;
      soutenance_updated.sujet = sujet;
      const {id, ...soutenanceUp_Ins}= soutenance_updated

        const soutenance =await this.SoutenanceRepository.preload({
            id: id_old,
            ...soutenanceUp_Ins
        });
        if (!soutenance) {
            new NotFoundException(`La soutenance d'id ${id} n'existe pas`);
        }
        console.log(typeof soutenance,soutenance)
        return await this.SoutenanceRepository.save(soutenance);
    }
}
