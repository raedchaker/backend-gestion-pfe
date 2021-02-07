import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {SoutenanceModel} from "./model/soutenance.model";
import {Repository} from "typeorm";

import {UserModel} from "../user/models/user.model";
import {SubjectModel} from "../subject/models/subject.model";
import {AjoutSoutenanceDto} from "./dto/AjoutSoutenance.dto";
import {UpdateSoutenanceDto} from "./dto/UpdateSoutenance";
import {AuthService} from "../auth/auth.service";


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
        const full_soutenances = [];
        const soutenances  = await this.SoutenanceRepository.find();
        console.log('la liste des soutenances ', soutenances)
        for (var i = 0; i < soutenances.length; i++) {
            if (!soutenances[i])
                throw new NotFoundException(`La soutenance n'est pas disponible`);

             console.log(`la soutenance ${i}`,soutenances[i])
            const subject = await this.SubjectRepository.findOne(soutenances[i].sujet);
            if(!subject)
                throw new NotFoundException(`sujet inexistant`);
            const nom_sujet = subject.title;
            const student = await this.UserRepository.findOne(subject.student);
            const nom_etudiant = student.lastname;
            const prenom_etudiant =student.firstname;
            const insNumber = student.insNumber;
            const responsable_Insat = await this.UserRepository.findOne(subject.teacher);
            const responsableInsat = responsable_Insat.lastname + ' ' + responsable_Insat.firstname;
            const examinateur = await this.UserRepository.findOne(soutenances[i].examinateur);
            const nom_examinateur = examinateur.lastname + ' ' + examinateur.firstname;
            const presidentJury =  await this.UserRepository.findOne(soutenances[i].presidentJury);
            const nom_presidentJury = presidentJury.lastname + ' ' + presidentJury.firstname;
            full_soutenances.push({...soutenances[i],insNumber,nom_sujet,responsableInsat,nom_etudiant,prenom_etudiant
                ,nom_examinateur,nom_presidentJury,subject,student,responsable_Insat,examinateur,presidentJury})
        }
            /*return await this.SoutenanceRepository.find();*/
            return full_soutenances;
    }

    async findSoutenanceById(id) {
        const soutenance = await this.SoutenanceRepository.findOne(id);
        if (!soutenance) {
            throw new NotFoundException(`La soutenance n'est pas disponible`);
        }
        if (soutenance) {
            const sujet = await this.SubjectRepository.findOne(soutenance.sujet);
            const presidentJury = await this.UserRepository.findOne(soutenance.presidentJury);
            const examinateur = await this.UserRepository.findOne(soutenance.examinateur);
            const responsable_INSAT = await this.UserRepository.findOne(sujet.teacher);
            const etudiant =await this.UserRepository.findOne(sujet.student);
            const insNumber = etudiant.insNumber;
            const nom_presidentJury = presidentJury.email;
            const nom_examinateur = examinateur.email;
            const full_object = { ...soutenance,insNumber,nom_examinateur,nom_presidentJury};
            return full_object;

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
        console.log(`insNumber is `,newSoutenance.insNumber);
        const student = await this.UserRepository.findOne({insNumber : newSoutenance.insNumber});
        if (!student ) {
            throw new NotFoundException(`  L'etudiant avec le num d'inscri ${newSoutenance.insNumber} n'existe pas`);
        }
        const sujet = await this.SubjectRepository.findOne({student: student.id.toString()},);
        if (!sujet ) {
            throw new NotFoundException('le sujet  n\'existe pas');
        }
        const presidentJury = await this.UserRepository.findOne({email : newSoutenance.presidentJury},);
        const examinateur = await this.UserRepository.findOne({email : newSoutenance.examinateur},);

        if (!presidentJury || presidentJury.role !== 'teacher') {
            throw new NotFoundException( `email du president de Jury n'existe pas ou ne represente pas un enseignant `);
        }
        if (!examinateur || examinateur.role !== 'teacher') {
            throw new NotFoundException('email du president de examinateur n\'existe pas ou ne represente pas un enseignant');
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
        console.log('before update soutenance',newSoutenance)
        const student = await this.UserRepository.findOne({insNumber : newSoutenance.insNumber});
        if (!student ) {
            throw new NotFoundException(`  L'etudiant avec le num d'inscri ${newSoutenance.insNumber} n'existe pas`);
        }
        const sujet = await this.SubjectRepository.findOne({student: student.id.toString()},);

        if (!sujet ) {
            throw new NotFoundException('le sujet  n\'existe pas');
        }

        const presidentJury = await this.UserRepository.findOne({email : newSoutenance.nom_presidentJury},);

        const examinateur = await this.UserRepository.findOne({email : newSoutenance.nom_examinateur},);

        if (!presidentJury || presidentJury.role !== 'teacher') {
            throw new NotFoundException( `email du president de Jury n'existe pas ou ne represente pas un enseignant `);
        }
        if (!examinateur || examinateur.role !== 'teacher') {
            throw new NotFoundException('email du president de examinateur n\'existe pas ou ne represente pas un enseignant');
        }

        const newSoutUp = {
            date: newSoutenance.date,
            heur: newSoutenance.heur,
            sujet: sujet.id.toString(),
            examinateur: examinateur.id.toString(),
            presidentJury: presidentJury.id.toString(),
        }
/*        newSoutenance.examinateur = examinateur.id.toString();
        newSoutenance.presidentJury = presidentJury.id.toString();
        newSoutenance.sujet = sujet.id.toString();

        newSoutenance.insNumber= null;
        newSoutenance.nom_presidentJury= null;
        newSoutenance.nom_examinateur= null;*/
        const soutenanceToBeModified = await this.SoutenanceRepository.findOne(id_old);
        const soutenance =await this.SoutenanceRepository.preload({
            id: soutenanceToBeModified.id,
            ...newSoutUp
        });
        console.log('soutenance preloaded',soutenance)
        if (!soutenance) {
            new NotFoundException(`La soutenance d'id ${id_old} n'existe pas`);
        }

        return await this.SoutenanceRepository.save(soutenance);
    }
}
