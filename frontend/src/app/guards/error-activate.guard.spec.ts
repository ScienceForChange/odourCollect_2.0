import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { errorActivateGuard } from './error-activate.guard';

describe('errorActivateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => errorActivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
