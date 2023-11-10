import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';

import { OdourService } from './odour.service';
import { Observation } from '../models/observation';
import { Router } from '@angular/router';
//TODO ver como desuscribirse o no estar suscrito si no estás en mapa

//Creo un customMarker para poder añadirle el ID directamente
class CustomMarker extends L.Marker {
  id: number;

  constructor(
    latlng: L.LatLngExpression,
    options?: L.MarkerOptions,
    id?: number,
  ) {
    super(latlng, options);
    this.id = id || 0;
  }
}

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private mapL!: L.Map;
  private markers: CustomMarker[] = [];
  private markerCluster: L.MarkerClusterGroup = L.markerClusterGroup({
    spiderLegPolylineOptions: { opacity: 0 },
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: false,
  });
  private observations: Observation[] = [];

  constructor(
    private odourService: OdourService,
    private router: Router,
  ) {
    this.getObservations();
  }

  public getMap(): L.Map {
    return this.mapL;
  }

  //Creo el marker
  private createMarkerIcon(markerType: string): L.DivIcon {
    return L.divIcon({
      className: 'my-div-icon',
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38],
      html: `<svg width="31" height="42" data-type=${markerType} class="odour-marker" viewBox="0 0 31 42" fill="none">
<g clip-path="url(#clip0_1369_14122)">
  <path d="M17.4133 40.3C21.5547 35.1172 31 22.5557 31 15.5C31 6.94271 24.0573 0 15.5 0C6.94271 0 0 6.94271 0 15.5C0 22.5557 9.44531 35.1172 13.5867 40.3C14.5797 41.5352 16.4203 41.5352 17.4133 40.3ZM15.5 10.3333C16.8703 10.3333 18.1844 10.8777 19.1534 11.8466C20.1223 12.8156 20.6667 14.1297 20.6667 15.5C20.6667 16.8703 20.1223 18.1844 19.1534 19.1534C18.1844 20.1223 16.8703 20.6667 15.5 20.6667C14.1297 20.6667 12.8156 20.1223 11.8466 19.1534C10.8777 18.1844 10.3333 16.8703 10.3333 15.5C10.3333 14.1297 10.8777 12.8156 11.8466 11.8466C12.8156 10.8777 14.1297 10.3333 15.5 10.3333Z" fill="#FF6200"/>
</g>
<defs>
  <clipPath id="clip0_1369_14122">
    <rect width="31" height="41.3333" fill="white"/>
  </clipPath>
</defs>
</svg>`,
    });
  }

  //See more info about
  public seeMoreAbout(observationId: number): void {
    this.router.navigate(['/map']);
    this.odourService.getOdour(observationId).subscribe((observationRes) => {
      const observation = observationRes.data[0];
      this.odourService.observation$.next(observation);
      this.centerMap(
        Number(observation.latitude),
        Number(observation.longitude),
      );
    });
  }

  //OnClick cada Marker
  private onClickMarker(event: L.LeafletMouseEvent) {
    const id = event.target.id;
    this.odourService.getOdourInfo(id).subscribe((res) => {
      this.odourService.observation$.next(res.data[0]);
    });
  }

  //Invalido el tamaño
  public invalidatedSize() {
    this.mapL.invalidateSize();
  }

  //Añadir los markers al mapa
  private addAllMarkers(observations: Observation[]) {
    this.markers.forEach((marker) => {
      this.markerCluster.removeLayer(marker);
      marker.remove();
    });

    this.markers = [];

    observations.forEach((observation) => {
      this.addOneMarker(observation);
    });

    this.mapL.invalidateSize();
  }

  //filtro por los 5 tipos
  private filterByTypes(observations: Observation[]) {
    const types = [
      'agriculture-livestock',
      'food-industries',
      'industrial',
      'urban',
      'waste-water',
    ];

    return observations.filter((observation) =>
      types.some(
        (type) =>
          type ===
          observation.relationships.odourSubType.relationships.odourType.slug,
      ),
    );
  }

  //para centrar el mapa
  public centerMap(lat: number, lon: number): void {
    const offset = 0.001;
    if (this.mapL) {
      this.mapL.flyTo(new L.LatLng(lat - offset, lon), this.mapL.getMaxZoom());
    }
  }

  //Eliminar un marker del mapa
  public deleteMarker(id: number) {
    const [marker] = this.markers.filter((marker) => marker.id === id);
    marker.remove();
  }

  //Añadir un marker al mapa
  public addOneMarker(observation: Observation) {
    const markerType =
      observation.relationships.odourSubType.relationships.odourType.slug;
    const icon = this.createMarkerIcon(markerType);

    const lat = Number(observation.latitude);
    const lng = Number(observation.longitude);

    const marker = new CustomMarker([lat, lng], { icon }, observation.id);
    marker.on('click', (e) => {
      this.onClickMarker(e);
    });

    this.markerCluster.addLayer(marker);
    this.markers.push(marker);
  }

  //Consigo las observaciones y me suscribo a getObservations
  private getObservations(): void {
    this.odourService.getObservations().subscribe((observations) => {
      if (observations.length) {
        this.addAllMarkers(this.filterByTypes(observations));
      }
      this.observations = observations;
    });
  }

  //Inicio el mapa
  public initializeMap(): void {
    const southWest = L.latLng(-90, -180);
    const northEast = L.latLng(90, 180);
    const bounds = L.latLngBounds(southWest, northEast);

    const map = L.map('map', {
      maxBounds: bounds,
      minZoom: 2,
      maxZoom: 18,
      zoom: 5,
      zoomControl: !0,
    });

    const tiles = L.tileLayer(
      'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
      },
    );

    tiles.addTo(map);
    map.locate({ setView: true });

    this.mapL = map;

    this.odourService.getAllOdours();

    //Mirar el depecreted
    // this.markerCluster.on('clusterclick', function (a) {
    //   a.layer.zoomToBounds();
    // });

    this.mapL.addLayer(this.markerCluster);
  }
}
