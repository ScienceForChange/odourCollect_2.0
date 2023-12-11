import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserLogin } from '../models/user-login';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _user: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _isVerified: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _routeToRedirect: string | null = null;

  private _error: boolean = false;

  get isLoggedIn(): BehaviorSubject<boolean> {
    return this._isLoggedIn;
  }

  set isLoggedIn(status: boolean) {
    this._isLoggedIn.next(status);
  }

  get isVerified(): boolean {
    return this._isVerified.value;
  }

  set isVerified(status: boolean) {
    this._isVerified.next(status);
  }

  get routeToRedirect(): string | null {
    return this._routeToRedirect;
  }

  set routeToRedirect(url: string) {
    this._routeToRedirect = url;
  }

  get error(): boolean {
    return this._error;
  }

  set error(error: boolean) {
    this._error = error;
  }

  get user(): BehaviorSubject<User | undefined> {
    return this._user;
  }

  set user(user: User | undefined) {
    this._user.next(user);
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenExtractor: HttpXsrfTokenExtractor,
  ) { }

  login(user: UserLogin): Observable<Object> {

    return this.http.post<{ status: number, data: User }>(`${environment.BACKEND_BASE_URL}login`,
      { ...user },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true,
      })
      .pipe(
        tap((resp: { status: number, data: User }) => {
          this.user = new User(resp.data);
          this._routeToRedirect ? this.router.navigate([this._routeToRedirect]) : this.router.navigate(['/map']);
          this._routeToRedirect = null;
          this._isLoggedIn.next(true);
        })
      );

  }

  logout(redirecTo?: string) {

    this.http.post(`${environment.BACKEND_BASE_URL}logout`, {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      }).subscribe(
        (() => {
          this._isLoggedIn.next(false);
          this.user = undefined;
          if (redirecTo) this.router.navigate([redirecTo]);
        })
      );

  }

  isLoginObs(): Observable<boolean> {
    return this._isLoggedIn;
  }

  refreshToken(fromErrorPage: boolean = false) {

    if (!this.tokenExtractor.getToken() && !fromErrorPage) { //si no es llama al función desde la pagina de error y no tenemos token redirigimos a onboarding
      this.router.navigate(['']);
    }
    return this.http.get<{ status: number, data: User }>(`${environment.BACKEND_BASE_URL}api/user-logged`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    }).pipe(
        tap((resp: { status: number, data: User }) => {
          this.user = new User(resp.data);
          this._isLoggedIn.next(true);
        }),
        catchError((error) => {
          if (error.status === 401 && fromErrorPage) { //si es error 401 le devolvemos a la pagina de error un true, para que permita navegar, ya que no es un error de servidor
            return of(true);
          }
          return of(false);
        })
      );

  }

  resendVerifyEmail() {

    return this.http.post(`${environment.BACKEND_BASE_URL}email/verification-notification`, {},
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true,
      }
    );
  }

}
