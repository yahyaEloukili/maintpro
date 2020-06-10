import { TestBed } from '@angular/core/testing';

import { StudyCaseService } from './study-case.service';

describe('StudyCaseService', () => {
  let service: StudyCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
