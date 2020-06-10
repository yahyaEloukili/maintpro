import { TestBed } from '@angular/core/testing';

import { MetiersService } from './metiers.service';

describe('MetiersService', () => {
  let service: MetiersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetiersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
