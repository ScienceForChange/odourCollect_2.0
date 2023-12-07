import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { OdourService } from './odour.service';

describe('OdourService', () => {
  let service: OdourService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(OdourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
