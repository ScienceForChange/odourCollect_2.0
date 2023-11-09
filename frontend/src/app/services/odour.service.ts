import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  OdourRelatedDataRes,
  OdourCreateForm,
} from '../models/odour-related-data';
import {
  Observation,
  ObservationQuery,
  ObservationRes,
} from '../models/observation';

@Injectable({
  providedIn: 'root',
})
export class OdourService {
  private _observations: BehaviorSubject<Observation[]> = new BehaviorSubject<
    Observation[]
  >([]);
  public observation$ = new Subject<Observation>();

  constructor(private http: HttpClient) {
    // this.getAllOdours();
  }

  public get observations(): Observable<Observation[]> {
    return this._observations.asObservable();
  }

  public getObservations(): Observable<Observation[]> {
    return this._observations;
  }

  //Actualizo las observaciones
  public updateObservations(observations: Observation[]): void {
    //Filtro aquí los 500 primeros
    // const filter500 = observations.slice(0,500)
    this._observations.next(observations);
  }

  //Conseguir los datos para los inputs del formulario
  public observationRelatedData(): Observable<OdourRelatedDataRes> {
    return this.http.get<OdourRelatedDataRes>(
      `${environment.BACKEND_BASE_URL}api/observations/related-data`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true,
      },
    );
  }

  //Crear un nuevo olor
  public createNewOdour(odour: OdourCreateForm): Observable<ObservationRes> {
    return this.http
      .post<ObservationRes>(
        `${environment.BACKEND_BASE_URL}api/observations`,
        { ...odour },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        },
      )
      .pipe(
        tap(({ data }) => {
          this.observation$.next(data[0]);
        }),
      );
  }

  //Conseguir todos los olores en el constructor
  public getAllOdours(): void {
    this.http
      .get<ObservationRes>(
        `${environment.BACKEND_BASE_URL}api/observations?include=odourSubType.odourType`,
      )
      .subscribe((observations) => {
        this.updateObservations(observations.data);
      });
  }

  //Conseguir los datos de un olor en particular
  public getOdourInfo(id: string): Observable<ObservationRes> {
    return this.http.get<ObservationRes>(
      `${environment.BACKEND_BASE_URL}api/observations/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true,
      },
    );
  }

  //Conseguir los olores filtrados
  public filterOdours(querys: ObservationQuery): Observable<ObservationRes> {
    const baseUrl = `${environment.BACKEND_BASE_URL}api/observations/?include=odourSubType.odourType,user.userable&`;

    const filters = Object.entries(querys)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value)
      .map(([key, value]) => {
        return (
          value && `filter[${key}]=${value?.length ? value.join(',') : value}`
        );
      })
      .join('&');

    const url = baseUrl + filters;

    return this.http.get<ObservationRes>(url);
  }

  //Eliminar olor
  public deleteObservation(observation: Observation): Observable<any> {
    return this.http
      .delete(
        `${environment.BACKEND_BASE_URL}api/observations/${observation.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        },
      )
      .pipe(
        tap(() => {
          this.updateObservations(
            this._observations.value.filter((obs) => obs.id !== observation.id),
          );
        }),
      );
  }
}
