import { TestBed } from '@angular/core/testing';

import { MapModalsService } from './map-modals.service';

describe('MapModalsService', () => {
  let service: MapModalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapModalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
