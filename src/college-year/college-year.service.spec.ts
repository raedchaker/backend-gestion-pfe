import { Test, TestingModule } from '@nestjs/testing';
import { CollegeYearService } from './college-year.service';

describe('CollegeYearService', () => {
  let service: CollegeYearService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollegeYearService],
    }).compile();

    service = module.get<CollegeYearService>(CollegeYearService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
