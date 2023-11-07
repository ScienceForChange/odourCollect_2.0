import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable, tap } from 'rxjs';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const VerifyGuardActivate = (): Observable<Boolean> => {

  const userService = inject(UserService);
  const router = inject(Router);

  return userService.checkVerifyUser().pipe(
    tap({
      next:() => {
        return true;            
      },
      error:() => {
        router.navigate(['/verify-email'])
        return false;
      }
    })
  );

}

export const UnverifyGuardActivate = (): boolean | UrlTree => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isVerified ? router.parseUrl('/map') : true;

}


