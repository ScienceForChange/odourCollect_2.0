import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';

import { errorActivateGuard, notErrorActivateGuard } from '../../app/guards/error-activate.guard';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('errorActivateGuard', () => {
  const executeErrorActivateGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => errorActivateGuard(...guardParameters));
      
  const executeNotErrorActivateGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notErrorActivateGuard(...guardParameters));
  
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;
  let authService: AuthService;
  let modalService:NgbModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [AuthService]
    });

    route = jest.fn() as unknown as ActivatedRouteSnapshot;
    state = jest.fn() as unknown as RouterStateSnapshot;
    authService = TestBed.inject(AuthService);
    modalService = TestBed.inject(NgbModal);

  });

  it('should be created', () => {
    expect(executeErrorActivateGuard).toBeTruthy();
    expect(executeNotErrorActivateGuard).toBeTruthy();
  });

  
  it('debería devolver true si authService.error es true', () => {

    authService.error = true;
    expect(executeErrorActivateGuard(route, state)).toBe(true);

  });
  it('debería devolver una URL si no hay error', () => {

    authService.error = false;
    expect(executeErrorActivateGuard(route, state)).toBeInstanceOf(UrlTree);

  });
  
  it('debería devolver true si authService.error es false', () => {

    authService.error = false;
    expect(executeNotErrorActivateGuard(route, state)).toBe(true);

  });
  it('debería devolver false si authService.error es true', () => {

    authService.error = true;
    expect(executeNotErrorActivateGuard(route, state)).toBe(false);

  });

});
