import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthGuardActivate, AuthGuardHomePage, AuthGuardLogoutActivate } from '../../app/guards/auth.guard';
import { AuthService } from '../../app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('authGuard', () => {

  const executeAuthGuardActivate: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => AuthGuardActivate(...guardParameters));

  const executeAuthGuardLogoutActivate: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => AuthGuardLogoutActivate(...guardParameters));

  const executeAuthGuardHomePage: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => AuthGuardHomePage(...guardParameters));

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
    expect(executeAuthGuardActivate).toBeTruthy();
    expect(executeAuthGuardLogoutActivate).toBeTruthy();
    expect(executeAuthGuardHomePage).toBeTruthy();
  });

  it('debería devolver true si el user está logueado', () => {
    authService.isLoggedIn = true;
    state.url = '/profile';
  });

  it('debería guardar la ruta en autservice, abrir un modal y devolver una URL donde redirigir al no estar logueado', () => {

    authService.isLoggedIn = false;
    state.url = '/profile';
    
    const spyModal = jest.spyOn(modalService, 'open');
    
    executeAuthGuardActivate(route, state);
    expect(authService.routeToRedirect).toBe(state.url);
    expect(spyModal).toHaveBeenCalled();
    expect(executeAuthGuardActivate(route, state)).toBeInstanceOf(UrlTree);

  });
  


  it('deberia devolver true si NO está logueado', () => {

    authService.isLoggedIn = false;    
    expect(executeAuthGuardLogoutActivate(route, state)).toBeTruthy();

  });
  it('deberia devolver una URL donde redirigir si está logueado', () => {

    authService.isLoggedIn = true;    
    expect(executeAuthGuardLogoutActivate(route, state)).toBeInstanceOf(UrlTree);

  });

  
  
  it('deberia devolver true si NO está logueado', () => {

    authService.isLoggedIn = false;    
    expect(executeAuthGuardHomePage(route, state)).toBeTruthy();

  });  
  it('deberia devolver una URL donde redirigir si está logueado', () => {

    authService.isLoggedIn = true;    
    expect(executeAuthGuardHomePage(route, state)).toBeInstanceOf(UrlTree);

  });

});
