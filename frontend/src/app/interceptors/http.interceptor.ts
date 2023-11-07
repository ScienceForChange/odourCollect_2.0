import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpXsrfTokenExtractor} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/**
 * Clase para interceptar las solicitudes HTTP y agregar el token CSRF (Cross-Site Request Forgery) en el encabezado de la solicitud.
 */

@Injectable()
export class LoginInterceptor implements HttpInterceptor {


  /**
   * Constructor del interceptor CSRF.
   * @param authService - Servicio de autenticación para gestionar el estado de inicio de sesión.
   */

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenExtractor: HttpXsrfTokenExtractor
  ) { }

  /**
   * Intercepta las solicitudes HTTP y agrega el token CSRF al encabezado si es necesario.
   * @param req - Solicitud HTTP entrante.
   * @param next - Manejador de la siguiente acción.
   * @returns Observable<HttpEvent<any>> - Observable que emite el evento HTTP resultante.
   */

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    this.authService.error = false;

    // Agregar la cabecera CSRF a todas las solicitudes no GET
    if (req.method !== 'GET') {
      const csrfToken = this.tokenExtractor.getToken() as string;
      req = req.clone({
        setHeaders: {
          'X-XSRF-TOKEN': csrfToken,
        },
      });
    }
    
    return next.handle(req).pipe(
      //en caso de que se de caulquier error comprobamos de que se trata
      catchError((error) => {
        // Si la solicitud HTTP devuelve un error de autentificado marca al usuario como desconectado.
        if (error.status === 401) this.authService.isLoggedIn = false;
        //TODO ¿Si la solicitud HTTP devuelve un error "to many request" marcar al usuario como desconectado?.
        if (error.status === 429) this.authService.isLoggedIn = false;
        // Si la solicitud HTTP devuelve un error de verificado  marcar al usuario como no verificado.
        if (error.status === 409) this.authService.isVerified = false;
        // Si la solicitud HTTP devuelve un error 0 y status ok false, es que se ha perdido la conexión con el servidor
        if (error.status === 0 && !error.ok){
          // Reenviamos a pantalla de error
          this.authService.error = true;
          this.router.navigate(['/error'])
          return throwError(() => error)
        }
        this.authService.error = false;
        return throwError(() => error)
      })
    );

  }
}
