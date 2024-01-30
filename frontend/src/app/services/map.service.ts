import { Injectable } from '@angular/core';
import * as M from 'maplibre-gl';
import { OdourService } from './odour.service';
import { Observation, ObservationGeoJSON } from '../models/observation';
import { Map, LngLat, LngLatBounds, GeoJSONSource } from 'maplibre-gl';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';
import { NgbActiveOffcanvas, NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { InfoObservationOffcanvaComponent } from '../modules/offcanvas/components/info-observation-offcanva/info-observation-offcanva.component';
import { MapModalsService } from './map-modals.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public map!: Map;
  public mapSettings: {
    zoom: [number];
    mapStyle: string;
    centerMapLocation: [number, number] | undefined;
    minZoom: number;
    maxZoom: number;
    bounds: LngLatBounds;
    clusterMaxZoom: number;
  } = {
    zoom: [4],
    mapStyle:
      'https://api.maptiler.com/maps/ed420585-427b-4078-8edf-7be43d23b4b7/style.json?key=XN4QD60Rt7rui111PDwQ',
    centerMapLocation: [2.1487613, 41.3776589],
    minZoom: 2,
    maxZoom: 17,
    bounds: new LngLatBounds(new LngLat(-90, 90), new LngLat(90, -90)),
    clusterMaxZoom: 17,
  };

  public GeoJSON$: Subject<ObservationGeoJSON> =
    new Subject<ObservationGeoJSON>();
  public spiderfiedGeoJSON$: any = new BehaviorSubject<ObservationGeoJSON>({
    type: 'FeatureCollection',
    features: [],
  });

  public showUserObservations: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public observation: Observation | null = null;
  public infoObservationOffcanva!: NgbOffcanvasRef;
    
  constructor(
    private userService: UserService,
    private odourService: OdourService,
    private router: Router,
    private offcanvasService: NgbOffcanvas,
    private mapModalsService: MapModalsService,
  ) {
    this.getObservations();
  }

  public getMap(): M.Map {
    return this.map;
  }

  //OnClick cada Marker
  public onClickMarker(evt: M.MapMouseEvent): void {
    const feature = this.map.queryRenderedFeatures(evt.point, {
      layers: ['unclustered-point'],
    });

    const featureSpiderfy = this.map.queryRenderedFeatures(evt.point, {
      layers: ['unclustered-point-spiderfy'],
    });

    const odourId = feature.length
      ? Number(feature[0].id)
      : Number(featureSpiderfy[0].id);

    if (odourId) {
      this.seeMoreAbout(odourId);
    }
  }

  //Volver a pintar el mapa con nuevo ancho y alto
  public resizeMap(): void {
    if (this.map) {
      this.map.resize();
    }
  }

  //Para centrar el mapa en mi ubicación
  public centerMapToMyLatLng(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lngLat = new LngLat(
          position.coords.longitude,
          position.coords.latitude,
        );
        this.map.easeTo({ duration: 3 * 1000, center: lngLat, zoom: 10 });
      });
    }
  }

  //para centrar el mapa
  public centerMap(lat: number, lon: number, zoom?: number): void {
    if (this.map) {
      const lngLat = new LngLat(lon, lat);
      this.map.easeTo({
        duration: 3 * 1000,
        center: lngLat,
        zoom: zoom || this.mapSettings.maxZoom,
      });
    }
  }

  //Funcion de añadir pointer al mouse
  public mouseEnterLeave(evt: M.MapMouseEvent): void {
    if (evt.type === 'mouseenter') {
      this.map.getCanvas().style.cursor = 'pointer';
    } else {
      this.map.getCanvas().style.cursor = '';
    }
  }

  //Funcion para caluclar el offset en circulo de las observaciones
  private calculateSpiderfiedPositionsCircle(count: number): number[][] {
    const leavesSeparation = 80;
    const leavesOffset = [0, 0];
    const points = [];
    const theta = (2 * Math.PI) / count;
    let angle = theta;

    for (let i = 0; i < count; i += 1) {
      angle = theta * i;
      const x = leavesSeparation * Math.cos(angle) + leavesOffset[0];
      const y = leavesSeparation * Math.sin(angle) + leavesOffset[1];
      points.push([x, y]);
    }
    return points;
  }

  //Funcion para caluclar el offset en espiral de las observaciones
  private calculateSpiderfiedPositions(count: number): number[][] {
    const legLengthStart = 25;
    const legLengthFactor = 5;
    const leavesSeparation = 40;
    const leavesOffset = [0, 0];
    const points = [];
    let legLength = legLengthStart;
    let angle = 0;

    for (let i = 0; i < count; i += 1) {
      angle += leavesSeparation / legLength + i * 0.0005;
      const x = legLength * Math.cos(angle) + leavesOffset[0];
      const y = legLength * Math.sin(angle) + leavesOffset[1];
      points.push([x, y]);

      legLength += (Math.PI * 2 * legLengthFactor) / angle;
    }
    return points;
  }

  //Funcion para crear el GEOJSON de los markers spiderfy
  private spiderFyCluster(
    source: M.GeoJSONSource,
    clusterId: number,
    lngLat: { lat: number; lng: number },
  ): void {
    //Consigo todos los markers que el cluster tiene
    source.getClusterLeaves(clusterId, Infinity, 0, (err, features) => {
      if (err) {
        return console.error(err);
      }

      if (features?.length) {
        // Calculate the spiderfied positions
        const spiderfiedPositions =
          features.length > 10
            ? this.calculateSpiderfiedPositions(features.length)
            : this.calculateSpiderfiedPositionsCircle(features.length);

        // Create a new GeoJson of features with the updated positions
        const spiderfiedGeoJson = {
          type: 'FeatureCollection',
          features: features.map((feature, index) => ({
            ...feature,
            properties: {
              ...feature.properties,
              iconOffset: spiderfiedPositions[index],
            },
            geometry: {
              ...feature.geometry,
              coordinates: [lngLat.lng, lngLat.lat],
            },
          })),
        };
        this.spiderfiedGeoJSON$.next(spiderfiedGeoJson);
      }
    });
  }

  // Cluster center and zoom in and spiderfy
  public centerMapToCluster(evt: M.MapMouseEvent): void {
    const features = this.map.queryRenderedFeatures(evt.point, {
      layers: ['clusters'],
    });

    if (features.length) {
      const source = this.map.getSource('observations') as GeoJSONSource;
      const clusterId = features[0].properties['cluster_id'];
      const lngLat = evt.lngLat;

      source.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err || !zoom) {
          return console.error(err);
        }
        if (zoom > 17) {
          this.spiderFyCluster(source, clusterId, lngLat);
        } else {
          this.map.easeTo({
            center: lngLat,
            zoom: zoom,
          });
        }
      });
    }
  }

  //Create GeoJson
  private createGeoJSON(observations: Observation[]): void {
    const userID = this.userService.user?.id;

    this.showUserObservations.subscribe((show) => {
      let obsGeoJson = observations;
      if (show && userID) {
        obsGeoJson = observations.filter(
          (observation) => observation.relationships.user?.id === userID,
        );
      }

      const geojsonData = {
        type: 'FeatureCollection',
        features: obsGeoJson.map((observation) => ({
          id: observation.id,
          observationType:
            observation.relationships.odourSubType.relationships.odourType.slug,
          type: 'Feature',
          properties: {
            ...observation,
            type: observation.relationships.odourSubType.relationships.odourType
              .slug,
          },
          geometry: {
            type: 'Point',
            coordinates: [
              Number(observation.longitude),
              Number(observation.latitude),
            ],
          },
        })),
      };

      this.GeoJSON$.next(geojsonData);
    });
  }

  //Consigo las observaciones y me suscribo a getObservations
  private getObservations(): void {
    this.odourService.getObservations().subscribe((observations) => {
      if (observations.length) {
        this.createGeoJSON(observations);
      }
    });
  }

  //Ver más información de la observación seleccionada.
  public seeMoreAbout(observationId: number, centerMap:boolean = false, openComments:boolean = false): void {
    
    if (this.router.url !== '/map') {
      this.router.navigate(['/map']);
    }
    
    if(this.infoObservationOffcanva && this.infoObservationOffcanva.componentInstance !== undefined && this.observation?.id === observationId) return;
    else if(this.infoObservationOffcanva && this.infoObservationOffcanva.componentInstance !== undefined) this.infoObservationOffcanva.componentInstance.offcanvas.close();
    

    this.infoObservationOffcanva = this.offcanvasService.open(
      InfoObservationOffcanvaComponent,
      {
        position: 'bottom',
        scroll: true,
        panelClass: 'default info-observation',
        backdrop: false,
        backdropClass: 'default info-observation',
      },
    );

    this.mapModalsService.toggleObservationModal();

    this.odourService.getOdour(observationId).subscribe((observationRes) => {
      this.observation = observationRes.data[0];
      this.infoObservationOffcanva.componentInstance.observation = this.observation;
      if(centerMap){
        this.centerMap(
          Number(this.observation.latitude),
          Number(this.observation.longitude),
        );
      }
      if(openComments){
        this.infoObservationOffcanva.componentInstance.openCommentaries();
      }
    });

  }
  //Funcion para abrir el offcanvas de la observación en caso de que no se haya cerrado
  public openInfoObservationOffcanva(): void {
    if(this.observation && this.observation.id) this.seeMoreAbout(this.observation.id);
  }

  //Inicio el mapa (Solo se ejecuta una vez)
  public initializeMap(map: Map, isStudyZone: boolean): void {
    this.map = map;

    if (!isStudyZone) {
      this.centerMapToMyLatLng();
    } else {
      this.odourService.studyZone.subscribe((studyZone) => {
        console.log('studyZone');
        if (studyZone) {
          const [lat, lon] = studyZone.features[0].geometry.coordinates[0][0];
          this.centerMap(lon, lat, 10);
        }
      });
    }

    [
      'agriculture-livestock',
      'food-industries',
      'urban',
      'waste-water',
      'industrial',
    ].forEach((type) => {
      const imageURL = `../../assets/images/markers/${type}.png`;
      this.map.loadImage(imageURL, (error, image) => {
        if (error || !image)
          return console.error(
            `Failed to load image from URL "${imageURL}": ${error}`,
          );
        this.map.addImage(type + '-icon', image);
      });
    });
  }
}
