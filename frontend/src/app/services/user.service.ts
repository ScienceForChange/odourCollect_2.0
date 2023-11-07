import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { ChangePasswords } from '../models/change-password';
import { MapService } from './map.service';
import { OdourService } from './odour.service';
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
      next:(resp)=>{
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
    return this.http.patch(`${environment.BACKEND_BASE_URL}api/users/${this.user?.id}`,{...this.user,...this.user?.relationships?.profile}, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true
    })
  }

  changePassword(passwords:ChangePasswords): Observable<Object> {
    return this.http.post(
      `${environment.BACKEND_BASE_URL}change-password`,
      { ...passwords },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true,
      }
    );
  }

  public addObservation(obs: Observation){
    this.user?.relationships.odourObservations.unshift(obs);
    if(this.user) this.user.total_observations ++;
  }

  public removeObservation(removedObs: Observation){
    if(this.user){
      this.user.relationships.odourObservations = this.user.relationships.odourObservations.filter((obs) => obs.id !== removedObs.id);
      this.user.total_observations --;
    }
  }

}
