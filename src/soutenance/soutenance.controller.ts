import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req } from '@nestjs/common';
import {SoutenanceService} from "./soutenance.service";
import { SoutenanceModel } from './Model/soutenance.model';
import { AjoutSoutenanceDto } from './DTO/AjoutSoutenance.dto';
import {UpdateSoutenanceDto} from "./dto/UpdateSoutenance";


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
    ) {
        console.log('find by ID soutenance');

        return this.soutenanceService.findSoutenanceById(id);
    }

    @Get('/student/:insNum')
    getSoutenanceByStudentInsNumber(
        @Param('insNum') insNum
    ) {
        console.log('find by student insNum soutenance');

        return this.soutenanceService.findSoutenanceByStudentNumber(+insNum);
    }

    @Post()
    addSoutenance(@Body() newSoutenance: AjoutSoutenanceDto):Promise< SoutenanceModel >{

        console.log('Ajouter une nouvelle soutenance');
        return this.soutenanceService.addSoutenance(newSoutenance);
    }

    @Delete(':id')
    deleteSoutenances(@Param('id') id){
        console.log('supprimer un element de la liste des soutenances existantes');
        return this.soutenanceService.deleteSoutenance(id);
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
