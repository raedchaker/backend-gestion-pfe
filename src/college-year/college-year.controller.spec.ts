import { Test, TestingModule } from '@nestjs/testing';
import { CollegeYearController } from './college-year.controller';

describe('CollegeYearController', () => {
  let controller: CollegeYearController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollegeYearController],
    }).compile();

    controller = module.get<CollegeYearController>(CollegeYearController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
