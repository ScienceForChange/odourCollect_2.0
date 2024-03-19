import { TestBed } from '@angular/core/testing';

import { NavigationService } from './navigation.service';

describe('MenuService', () => {
  let service: NavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should subscrition to footerVisible', () => {

    let bool = false;

    service.footerVisible.subscribe((value) => {
      bool = value;
    expect(bool).toBe(true);

    });
    service.footerVisible = true;
    expect(bool).toBe(true);
  });


});
