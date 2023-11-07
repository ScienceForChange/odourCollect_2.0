import { TestBed } from '@angular/core/testing';

import { OdourService } from './odour.service';

describe('OdourService', () => {
  let service: OdourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OdourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
