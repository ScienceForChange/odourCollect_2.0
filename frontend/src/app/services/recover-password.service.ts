import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordService {

  constructor(private http: HttpClient) {}

  postEmail(email:string):Observable<Object>{
    
    return this.http.post(`${environment.BACKEND_BASE_URL}forgot-password`,{email},{
      headers:{'Content-Type': 'application/json'}
    });

  }

}
