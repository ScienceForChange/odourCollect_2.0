import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { HttpXsrfTokenExtractor } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalComponent } from '../modules/modals/register-modal/register-modal.component';

export const AuthGuardActivate: CanActivateFn = (route, state) => {

  const authService: AuthService  = inject(AuthService);
  const router:Router             = inject(Router);
  const modalService:NgbModal     = inject(NgbModal);

  //En caso de estar logueado dejamos pasar.
  if (authService.isLoggedIn.value) return true;

  //En caso contrario le pasamos al servicio login la url protegida y redigimos a login.
  authService.routeToRedirect = state.url;
  if(!authService.isLoggedIn.value) modalService.open(RegisterModalComponent, { windowClass: 'default', backdropClass: 'default', centered : true, size: 'sm' } )
  return router.parseUrl('/map');
};

export const AuthGuardLogoutActivate: CanActivateFn = (route, state) => {

  const authService: AuthService  = inject(AuthService);
  const router:Router             = inject(Router);

  //En caso de estar logueado no dejamos pasar, en caso contrario sí.
  return authService.isLoggedIn.value ? router.parseUrl('/map') : true;
};

export const AuthGuardHomePage: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);
  const router = inject(Router);
  const tokenExtractor: HttpXsrfTokenExtractor = inject(HttpXsrfTokenExtractor);

  //En caso de estar logueado o existir un cookie XSRF redirigimos a /map, en caso contrario dejamos pasar.
  return authService.isLoggedIn.value || tokenExtractor.getToken() ? router.parseUrl('/map') : true;
};
