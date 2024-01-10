import { AuthService } from "../services/auth.service";
import { catchError, of } from 'rxjs';
import { NotificationService } from "../services/notification.service";

export function appInitializer(authService: AuthService, notificationService: NotificationService) {
    return () => authService.refreshToken()
        .pipe(
            catchError(() => of())
        );
}