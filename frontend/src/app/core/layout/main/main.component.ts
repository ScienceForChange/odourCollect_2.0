import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, Event, NavigationEnd } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';
import { Subscription } from 'rxjs';
import { MapService } from '../../../services/map.service';
import { Map, LngLatBounds } from 'maplibre-gl';
import * as M from 'maplibre-gl';
import { ObservationGeoJSON } from 'src/app/models/observation';
import { OdourService } from '../../../services/odour.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public map!: Map;
  public mapSettings: {
    zoom: [number];
    mapStyle: string;
    centerMapLocation: [number, number] | undefined;
    minZoom: number;
    maxZoom: number;
    bounds: LngLatBounds;
    clusterMaxZoom: number;
  } = this.mapService.mapSettings;

  public studyZone!: any;

  private subscriptions = new Subscription();

  public observations!: ObservationGeoJSON;
  public observationsSpiderfy: ObservationGeoJSON = {
    type: 'FeatureCollection',
    features: [],
  };

  public isVisible: boolean = false;
  public showMenu: string | undefined = undefined;
  public displayMap: boolean = false;

  private isStudyZoneRoute!: boolean;

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private mapService: MapService,
    private cdr: ChangeDetectorRef,
    private odourService: OdourService,
  ) {}

  private displayHeaderByRoute(event: NavigationEnd): void {
    if (event.url === '/map') {
      this.mapService.openInfoObservationOffcanva();
      this.displayMap = true;
    } else if (event.url === '/profile/my-study-zones/id') {
      this.displayMap = true;
      this.isStudyZoneRoute = true;
    } else {
      this.displayMap = false;
      this.navigationService.updateStateMenu(undefined);
      if (!this.showMenu) return;
      this.navigationService.updateStateMenu('close');
    }
  }

  public onMapLoad(map: Map) {
    this.map = map;
    this.mapService.initializeMap(map, this.isStudyZoneRoute);
  }

  public mouseEvent(evt: M.MapMouseEvent) {
    this.mapService.mouseEnterLeave(evt);
  }

  public centerZoomCluster(evt: M.MapMouseEvent) {
    this.mapService.centerMapToCluster(evt);
  }

  public getMoreInfoAbout(evt: M.MapMouseEvent) {
    this.mapService.onClickMarker(evt);
  }

  public deletePointsSpiderfy(evt: any) {
    const avoidLayers = [
      'unclustered-point',
      'unclustered-point-spiderfy',
      'clusters',
      'cluster-count',
    ];
    if (this.map) {
      const features = this.map.queryRenderedFeatures(evt.point);
      const isClickedOnPermitedLayer = features.some((feature) =>
        avoidLayers.some((layer) => feature.layer.id.includes(layer)),
      );

      if (
        evt.type === 'zoomstart' &&
        this.observationsSpiderfy.features.length
      ) {
        return this.mapService.spiderfiedGeoJSON$.next({
          type: 'FeatureCollection',
          features: [],
        });
      }

      if (
        this.observationsSpiderfy.features.length &&
        !isClickedOnPermitedLayer
      ) {
        this.mapService.spiderfiedGeoJSON$.next({
          type: 'FeatureCollection',
          features: [],
        });
      }
    }
  }

  async ngOnInit() {
    //observable of GEOJSON of observations
    this.subscriptions.add(
      this.mapService.GeoJSON$.subscribe((value: ObservationGeoJSON) => {
        this.observations = value;
      }),
    );

    //observable of study zone
    this.subscriptions.add(
      this.odourService.studyZone.subscribe((studyZone) => {
        this.studyZone = studyZone;
      }),
    );

    //observable of GEOJSON of observations spiderfied
    this.subscriptions.add(
      this.mapService.spiderfiedGeoJSON$.subscribe(
        (value: ObservationGeoJSON) => {
          this.observationsSpiderfy = value;
          this.cdr.detectChanges();

          if (this.map) {
            if (!value.features.length) {
              this.map.setPaintProperty('clusters', 'circle-color', '#D7B1F2');
            } else {
              this.map.setPaintProperty(
                'clusters',
                'circle-color',
                'rgba(215, 177, 242, 0.5)',
              );
            }
          }
        },
      ),
    );

    this.subscriptions.add(
      this.navigationService.footerVisible.subscribe((value) => { 
        this.isVisible = value;
      }),
    );
    this.subscriptions.add(
  
      this.navigationService.isVisibleState.subscribe((value) => {
        this.showMenu = value;
      }),
    );
    this.subscriptions.add(
      this.router.events
        .pipe(
          filter(
            (event: Event): event is NavigationEnd =>
              event instanceof NavigationEnd,
          ),
        )
        .subscribe((event: NavigationEnd) => {
          this.displayHeaderByRoute(event);
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
