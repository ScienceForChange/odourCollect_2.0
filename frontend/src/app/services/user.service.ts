import { HttpClient } from '@angular/common/http';
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
    this.http.get(`${environment.BACKEND_BASE_URL}api/observations/export`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        responseType: 'blob'
      },
      withCredentials: true
    }).subscribe({
      next: (resp:any) => {
        const url = window.URL.createObjectURL(resp);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'observations.csv';
        a.click();
      },
      error: (err) => {
        console.log(err);
      }
    }
    );
  }

}
