import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req } from '@nestjs/common';
import {SoutenanceService} from "./soutenance.service";
import { SoutenanceModel } from './models/soutenance.model';
import { AjoutSoutenanceDto } from './DTO/AjoutSoutenance.dto';
import { UpdateSoutenanceDto } from './DTO/UpdateSoutenance.dto';

@Controller('soutenance')
export class SoutenanceController {
// Ajouter Guards
    constructor(private soutenanceService:SoutenanceService) {
    }

    @Get()
    getSoutenances() : Promise< SoutenanceModel[] >{
        console.log('la liste des soutenances existantes');
        return this.soutenanceService.findAllSoutenances();

    }

    @Get(':id')
    getSoutenanceById(
      @Param('id') id
    ) : Promise< SoutenanceModel >{
        console.log('find by ID soutenance');

        return this.soutenanceService.findSoutenanceById(id);
    }
    @Post()
    addSoutenance(@Body() newSoutenance: AjoutSoutenanceDto):Promise< SoutenanceModel >{

        console.log('Ajouter une nouvelle soutenance');

        return this.soutenanceService.addSoutenance(newSoutenance);
    }
    @Delete()
    deleteSoutenances(){
        console.log('supprimer un element de la liste des soutenances existantes');
        return ' soutenance supprimée'
    }
    @Patch(':id')
    updateSoutenances(
      @Body() newSoutenance: UpdateSoutenanceDto,
      @Param('id') id
    ){
        console.log('modifier un element de la liste des soutenances existantes');
        return this.soutenanceService.updateSoutenance(id,newSoutenance);
    }
}
