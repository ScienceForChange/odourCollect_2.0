import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  OdourRelatedDataRes,
  OdourCreateForm,
} from '../models/odour-related-data';
import {
  Comment,
  MapObservation,
  Observation,
  ObservationQuery,
  ObservationRes,
} from '../models/observation';

@Injectable({
  providedIn: 'root',
})
export class OdourService {
  private _observations: BehaviorSubject<MapObservation[]> =
    new BehaviorSubject<MapObservation[]>([]);
  private _studyZone: BehaviorSubject<any> = new BehaviorSubject<any>(
    undefined,
  );

  constructor(private http: HttpClient) {}

  public get studyZone(): Observable<any> {
    return this._studyZone.asObservable();
  }

  public updateStudyZone(studyZone: any): void {
    this._studyZone.next(studyZone);
  }

  public get observations(): Observable<MapObservation[]> {
    return this._observations.asObservable();
  }

  public getObservations(): Observable<MapObservation[]> {
    return this._observations;
  }

  //Actualizo las observaciones
  public updateObservations(observations: MapObservation[] | any): void {
    //Cambiar Observation X Map_observation
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
          const currObservations = this._observations.getValue();
          if (data[0].relationships.user?.id !== undefined) {
            const mapObservation = {
              color: data[0].color,
              id: data[0].id,
              latitude: data[0].latitude,
              longitude: data[0].longitude,
              user_id: data[0].relationships.user.id,
            };
            this._observations.next([...currObservations, mapObservation]);
          }
        }),
      );
  }

  //Conseguir la zona de estudio
  public getStudyZone() {
    setTimeout(() => {
      const studyZone = {
        name: 'Barcelona',
        description: 'Barcelona is a city on the coast of northeastern Spain.',
        last_register: '24/04/22, 09:53 am',
        observations_count: 32,
        users_count: 8,
        episode_count: 6,
        study_area_manager: 'John Doe',
        study_area_manager_email: 'lore ipsum',
        email: 'loreipsum@ipsum.lore',
        objective: 'Lorem ipsum dolor sit amet, consec',
        observations: [
          {
            id: 13824,
            latitude: '41.37106',
            longitude: '2.15486',
            relationships: {
              odourSubType: {
                id: 23,
                odourTypeId: 3,
                name: 'Amines',
                slug: 'amines-2',
                relationships: {
                  odourType: {
                    id: 3,
                    name: 'Agriculture / Livestock',
                    slug: 'agriculture-livestock',
                    relationships: [],
                  },
                },
              },
              user: {
                id: 2608,
                email: 'test@scienceforchange.eu',
                avatar_id: '1',
                relationships: [],
                createdAt: '2023-09-21 12:09:43',
                updatedAt: '2023-09-21 12:09:43',
              },
            },
            description: null,
            origin: null,
            createdAt: '2023-12-04 15:12:07',
            updatedAt: '2023-12-04 15:12:07',
          },
          {
            id: 13823,
            latitude: '41.37106',
            longitude: '2.15486',
            relationships: {
              odourSubType: {
                id: 22,
                odourTypeId: 3,
                name: 'Ammonia',
                slug: 'ammonia-2',
                relationships: {
                  odourType: {
                    id: 3,
                    name: 'Agriculture / Livestock',
                    slug: 'agriculture-livestock',
                    relationships: [],
                  },
                },
              },
              user: {
                id: 2608,
                email: 'test@scienceforchange.eu',
                avatar_id: '1',
                relationships: [],
                createdAt: '2023-09-21 12:09:43',
                updatedAt: '2023-09-21 12:09:43',
              },
            },
            description: null,
            origin: null,
            createdAt: '2023-12-04 15:12:00',
            updatedAt: '2023-12-04 15:12:00',
          },
          {
            id: 13822,
            latitude: '41.37106',
            longitude: '2.15486',
            relationships: {
              odourSubType: {
                id: 18,
                odourTypeId: 3,
                name: 'Organic fertilizers (manure/slurry)',
                slug: 'organic-fertilizers-manure-slurry',
                relationships: {
                  odourType: {
                    id: 3,
                    name: 'Agriculture / Livestock',
                    slug: 'agriculture-livestock',
                    relationships: [],
                  },
                },
              },
              user: {
                id: 2608,
                email: 'test@scienceforchange.eu',
                avatar_id: '1',
                relationships: [],
                createdAt: '2023-09-21 12:09:43',
                updatedAt: '2023-09-21 12:09:43',
              },
            },
            description: null,
            origin: null,
            createdAt: '2023-12-04 15:12:53',
            updatedAt: '2023-12-04 15:12:53',
          },
          {
            id: 13821,
            latitude: '41.37106',
            longitude: '2.15486',
            relationships: {
              odourSubType: {
                id: 18,
                odourTypeId: 3,
                name: 'Organic fertilizers (manure/slurry)',
                slug: 'organic-fertilizers-manure-slurry',
                relationships: {
                  odourType: {
                    id: 3,
                    name: 'Agriculture / Livestock',
                    slug: 'agriculture-livestock',
                    relationships: [],
                  },
                },
              },
              user: {
                id: 2608,
                email: 'test@scienceforchange.eu',
                avatar_id: '1',
                relationships: [],
                createdAt: '2023-09-21 12:09:43',
                updatedAt: '2023-09-21 12:09:43',
              },
            },
            description: null,
            origin: null,
            createdAt: '2023-12-04 14:12:20',
            updatedAt: '2023-12-04 14:12:20',
          },
          {
            id: 13779,
            latitude: '40.89540',
            longitude: '-8.50380',
            relationships: {
              odourSubType: {
                id: 16,
                odourTypeId: 3,
                name: 'Dead animal',
                slug: 'dead-animal',
                relationships: {
                  odourType: {
                    id: 3,
                    name: 'Agriculture / Livestock',
                    slug: 'agriculture-livestock',
                    relationships: [],
                  },
                },
              },
              user: {
                id: 2202,
                email: 'rafaelaangeli28@gmail.com',
                avatar_id: '1',
                relationships: [],
                createdAt: '2022-10-08 19:10:16',
                updatedAt: '2022-10-08 19:10:23',
              },
            },
            description: 'Casqueira',
            origin: 'Casqueira',
            createdAt: '2023-07-21 20:07:50',
            updatedAt: '2023-07-21 20:07:50',
          },
          {
            id: 13777,
            latitude: '41.42880',
            longitude: '2.21810',
            relationships: {
              odourSubType: {
                id: 47,
                odourTypeId: 5,
                name: 'Asphalt / Rubber',
                slug: 'asphalt-rubber',
                relationships: {
                  odourType: {
                    id: 5,
                    name: 'Industrial',
                    slug: 'industrial',
                    relationships: [],
                  },
                },
              },
              user: {
                id: 248,
                email: 'gemma.gege@gmail.com',
                avatar_id: '1',
                relationships: [],
                createdAt: '2019-07-14 06:07:39',
                updatedAt: '2023-07-19 21:07:07',
              },
            },
            description:
              'Entendwmos k hay k hacer mantenimiento, pero en verano???   Tenmos k tener todo cerrado!!  Es horrible',
            origin: 'C-32 asfaltado llwvan mas de 4 noches',
            createdAt: '2023-07-19 21:07:39',
            updatedAt: '2023-07-19 21:07:39',
          },
        ],
        coordinates: [
          [
            [2.1542871, 41.3896884],
            [2.1702558, 41.3928436],
            [2.1842498, 41.3903967],
            [2.1831337, 41.3819608],
            [2.1685994, 41.3576129],
            [2.1296275, 41.3675335],
            [2.1542013, 41.3895596],
          ],
        ],
      };

      const studyZoneGeoJson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              name: studyZone.name,
              description: studyZone.description,
              last_register: studyZone.last_register,
              observations_count: studyZone.observations_count,
              users_count: studyZone.users_count,
              episode_count: studyZone.episode_count,
              study_area_manager: studyZone.study_area_manager,
              study_area_manager_email: studyZone.study_area_manager_email,
              objective: studyZone.objective,
              observations: studyZone.observations,
              email: studyZone.email,
            },
            geometry: {
              type: 'Polygon',
              coordinates: studyZone.coordinates,
            },
          },
        ],
      };
      this._studyZone.next(studyZoneGeoJson);
      const observations = studyZone.observations;
      this.updateObservations(observations);
    }, 500);
  }

  //Conseguir todos los olores en el constructor
  public getAllOdours(): void {
    this.http
      .get<ObservationRes>(`${environment.BACKEND_BASE_URL}api/map`)
      .subscribe((observations) => {
        this.updateObservations(observations.data);
      });
  }

  //Conseguir los olores filtrados
  public filterOdours(querys: ObservationQuery): Observable<ObservationRes> {
    const baseUrl = `${environment.BACKEND_BASE_URL}api/map`;

    let distanceUrl;

    if (querys.is_inside) {
      distanceUrl = `&is_inside=${querys.is_inside}&latitude=${querys.latitude}&longitude=${querys.longitude}`;
    }

    const { is_inside, latitude, longitude, ...querysFiltered } = querys;

    const filters = Object.entries(querysFiltered)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `filter[${key}]=${value.join(',')}`;
        }
        return `filter[${key}]=${value}`;
      })
      .join('&');

    const url = baseUrl + '?' + filters + distanceUrl;

    return this.http.get<ObservationRes>(url);
  }

  //Conseguir los datos de un olor en particular
  public getOdourInfo(id: number): Observable<ObservationRes> {
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

  //Conseguir un olor
  public getOdour(odourId: number): Observable<ObservationRes> {
    return this.http.get<ObservationRes>(
      `${environment.BACKEND_BASE_URL}api/observations/${odourId}`,
    );
  }

  //Eliminar olor
  public deleteObservation(observationId: number): Observable<any> {
    return this.http
      .delete(
        `${environment.BACKEND_BASE_URL}api/observations/${observationId}`,
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
          const observations = this._observations
            .getValue()
            .filter((observation) => observation.id !== observationId);
          this.updateObservations(observations);
        }),
      );
  }

  public addObservationLike(obsId: number) {
    return this.http.post(
      `${environment.BACKEND_BASE_URL}api/like`,
      {
        likeable_type: 'App\\Models\\OdourObservation',
        id: obsId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true,
      },
    );
  }

  public deleteObservationLike(obsId: number) {
    return this.http.delete(`${environment.BACKEND_BASE_URL}api/like`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
      body: {
        likeable_type: 'App\\Models\\OdourObservation',
        id: obsId,
      },
    });
  }

  public addCommentary(
    body: string,
    user_id: number,
    odour_observation_id: number,
  ): Observable<any> {
    return this.http.post(
      `${environment.BACKEND_BASE_URL}api/observation/${odour_observation_id}/comments`,
      {
        likeable_type: 'App\\Models\\OdourObservation',
        body: body,
        user_id: user_id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true,
      },
    );
  }

  public deleteCommentary(
    idObservation: number,
    idComentary: number,
  ): Observable<any> {
    return this.http.delete(
      `${environment.BACKEND_BASE_URL}api/observation/${idObservation}/comments/${idComentary}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true,
      },
    );
  }
}
