import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecoverPasswords } from '../models/recover-password';

@Injectable({
  providedIn: 'root',
})
export class RecoverCreatePasswordService {
  constructor(private http: HttpClient) {}

  postCreatePasswords(passwords: RecoverPasswords): Observable<Object> {
    return this.http.post(
      `${environment.BACKEND_BASE_URL}reset-password`,
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
}
