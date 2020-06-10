import { TestBed } from '@angular/core/testing';

import { Services.ExcelService } from './services.excel.service';

describe('Services.ExcelService', () => {
  let service: Services.ExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Services.ExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
