import { AuthService } from "../services/auth.service";
import { catchError, of } from 'rxjs';

export function appInitializer(authService: AuthService) {
    return () => authService.refreshToken()
        .pipe(
            catchError(() => of())
        );
}