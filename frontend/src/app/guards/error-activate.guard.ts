import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const errorActivateGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);

  //En caso de haber error con el servidor dejamos pasar.
  if (authService.error) return true;

  return router.parseUrl('/');
}

export const notErrorActivateGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  
  //En caso de no haber error con el servidor dejamos pasar.
  return !authService.error;
}
