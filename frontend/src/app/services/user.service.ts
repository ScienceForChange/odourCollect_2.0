import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { ChangePasswords } from '../models/change-password'
import { Observation } from '../models/observation';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: User | undefined = this.authService.user.value;

  get user(): User | undefined {
    return this._user;
  }

  set user(user: User | undefined) {
    this._user = user;
  }


  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {

    this.authService.user.subscribe({
      next: (resp) => {
        this.user = resp;
      }
    })

  }

  checkVerifyUser(): Observable<boolean> {
    if (this.authService.isVerified) return of(true);
    return this.http.get(`${environment.BACKEND_BASE_URL}api/user-data`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: true
    }).pipe(
      map(() => {
        this.authService.isVerified = true;
        return true
      })
    );
  }

  delete(): Observable<Object> {
    return this.http.delete(`${environment.BACKEND_BASE_URL}api/users/${this.user?.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true
    }).pipe(
      map(() => {
        this.authService.user = undefined;
        return true
      })
    );
  }

  update(): Observable<Object> {
    return this.http.patch(`${environment.BACKEND_BASE_URL}api/users/${this.user?.id}`, { ...this.user, ...this.user?.relationships?.profile }, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true
    })
  }

  changePassword(passwords: ChangePasswords): Observable<Object> {
    return this.http.post(`${environment.BACKEND_BASE_URL}change-password`, { ...passwords },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true,
      }
    );
  }

  public addObservation(obs: Observation) {
    this.user?.relationships.odourObservations.unshift(obs);
  }

  public removeObservation(removedObsId: number) {
    if (this.user) {
      this.user.relationships.odourObservations = this.user.relationships.odourObservations.filter((obs) => obs.id !== removedObsId);
    }
  }

  public addLikeToObservation(obsId: number) {
    return this.http.post(`${environment.BACKEND_BASE_URL}/like`, {
      likeable_type: 'App\\Models\\OdourObservation',
      id: obsId
     },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true,
      }
    );
  }

  downloadObservations(): void {
    const options: {
      headers?: HttpHeaders;
      observe?: 'body';
      params?: HttpParams;
      reportProgress?: boolean;
      responseType: 'arraybuffer';
      withCredentials?: boolean;
  } = {
      responseType: 'arraybuffer'
  };

    this.http.get(`${environment.BACKEND_BASE_URL}api/observations/export`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      withCredentials: true,
      responseType: 'arraybuffer'
    })
    .pipe(
      map((file: ArrayBuffer) => {
          return file;
      })
    )
    .subscribe({
      next: (resp:any) => {
        const blob = new Blob([resp], { type: "text/csv;charset=utf-8" });
        const fileURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = fileURL;
        const date = new Date();
        const dateSlug = `${date.toISOString().slice(0,10)}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
        link.download = `misObservaciones-${ dateSlug }.csv`;
        link.click();
        link.remove();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  public uplevel(level:number) {
    if (this.user && this.user.relationships && this.user.relationships.profile && (this.user.relationships.profile.level  && this.user.relationships.profile.level < level)) {
      this.user.relationships.profile.level = level;
    }
  }

}
