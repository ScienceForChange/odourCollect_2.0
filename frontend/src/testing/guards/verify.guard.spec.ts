import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { VerifyGuardActivate } from '../../app/guards/verify.guard';

describe('verifyGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => VerifyGuardActivate(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
