import { YearDto } from './dto/year-dto';
import { AuthGuard } from '@nestjs/passport';
import { CollegeYearModel } from './models/college-year.model';
import { CollegeYearService } from './college-year.service';
import { Controller, Get, Param, Delete, UseGuards, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('college-year')
export class CollegeYearController {

    constructor(private collegeYearService: CollegeYearService) {}
  
    @Get('')
    async getYears(): Promise<CollegeYearModel[]> {
      return await this.collegeYearService.findAllYears();
    }
  
    @Get(':id')
    async getYearById(@Param('id') id: string) {
      return await this.collegeYearService.findYearById(id);
    }
  
  
    @Delete(':id')
    deleteYear(@Param('id') id:string) {
      return this.collegeYearService.deleteYear(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async addSubject(
      @Body() newYear: YearDto,
      @Req() request: Request,
    ): Promise<CollegeYearModel> {
      return await this.collegeYearService.addYear(newYear);
    }
  
  }
  