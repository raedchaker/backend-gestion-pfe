import {Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {SoutenanceService} from "./soutenance.service";

@Controller('soutenance')
export class SoutenanceController {

    constructor(private soutenanceService:SoutenanceService) {
    }

    @Get()
    getSoutenances(){
        console.log('la liste des soutenances existantes');

        return this.soutenanceService.findAllSoutenances();
    }
    @Post()
    addSoutenances(){
        console.log('Ajouter une nouvelle soutenance');
        return 'Soutenance Ajoutée'
    }
    @Delete()
    deleteSoutenances(){
        console.log('supprimer un element de la liste des soutenances existantes');
        return ' soutenance supprimée'
    }
    @Put()
    updateSoutenances(){
        console.log('modifier un element de la liste des soutenances existantes');
        return 'Soutenance Modifiée'
    }
}
