import { Injectable } from '@angular/core';
import { ObservationRes } from '../models/observation';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'leaflet';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  getTranslation(trans:string){
    return this.http.post<any>(`${environment.BACKEND_BASE_URL}api/observations/${trans}`,{},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        },
      ).pipe(
        catchError(() => of({
          title: "titulo " + trans,
          body:"body " + trans,
          footer: "footer " + trans
        }))
      );
  }
  
}
