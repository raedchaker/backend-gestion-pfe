import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {SoutenanceModel} from "./model/soutenance.model";
import {Repository} from "typeorm";
import { ObjectID } from 'mongodb';
import {UserModel} from "../user/models/user.model";
import {SubjectModel} from "../subject/models/subject.model";
import {AjoutSoutenanceDto} from "./dto/AjoutSoutenance.dto";
import {UpdateSoutenanceDto} from "./dto/UpdateSoutenance";


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
        const soutenance = await this.SoutenanceRepository.findOne(id);
        if (soutenance) {
            const sujet = await this.SubjectRepository.findOne(soutenance.sujet);
            const presidentJury = await this.UserRepository.findOne(soutenance.presidentJury);
            const examinateur = await this.UserRepository.findOne(soutenance.examinateur);
            const responsable_INSAT = await this.UserRepository.findOne(sujet.teacher);
            const etudiant =await this.UserRepository.findOne(sujet.student);
            const full_object = { ...soutenance,sujet, presidentJury, examinateur,responsable_INSAT, etudiant};
            return full_object;
            if (!soutenance) {
                throw new NotFoundException(`La soutenance n'est pas disponible`);
            }
        }
    }
    async findSoutenanceByStudentNumber(insNumber: number) {
        const student = await this.UserRepository.findOne({insNumber: insNumber});
        if(!student){
            throw new NotFoundException(`Etudiant inexistant `);
        }
        const subject = await this.SubjectRepository.findOne({student : student.id.toString()})
        if(!subject){
            throw new NotFoundException(`Etudiant avec le num d'inscription ${insNumber} ne possede pas un sujet `);
        }
        const soutenance = await this.SoutenanceRepository.findOne({sujet : subject.id.toString()});
        if(!soutenance){
            throw new NotFoundException(`Etudiant avec le num d'inscription ${insNumber} ne possede pas de soutenance `);
        }
        if (soutenance) return soutenance;

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
        soutenance.examinateur = examinateur.id.toString();
        soutenance.presidentJury = presidentJury.id.toString();
        soutenance.sujet = sujet.id.toString();


        return await this.SoutenanceRepository.save(soutenance);

    }

    async deleteSoutenance(id: number) {
        return await this.SoutenanceRepository.delete(id);
    }



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


        newSoutenance.examinateur = examinateur.id.toString();
        newSoutenance.presidentJury = presidentJury.id.toString();
        newSoutenance.sujet = sujet.id.toString();

        const soutenanceToBeModified = await this.SoutenanceRepository.findOne(id_old)
        const soutenance =await this.SoutenanceRepository.preload({
            id: soutenanceToBeModified.id,
            ...newSoutenance
        });
        if (!soutenance) {
            new NotFoundException(`La soutenance d'id ${id_old} n'existe pas`);
        }

        return await this.SoutenanceRepository.save(soutenance);
    }
}
