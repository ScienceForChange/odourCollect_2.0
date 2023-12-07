import { FooterService } from 'src/app/services/footer.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, Event, NavigationEnd } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { Subscription } from 'rxjs';
import { MapService } from '../../../services/map.service';
import { Map, LngLatBounds } from 'maplibre-gl';
import * as M from 'maplibre-gl';
import { ObservationGeoJSON } from 'src/app/models/observation';

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

  private subscriptions = new Subscription();

  public observations!: ObservationGeoJSON;
  public observationsSpiderfy: ObservationGeoJSON = {
    type: 'FeatureCollection',
    features: [],
  };

  public isVisible: boolean = false;
  public showMenu: string | undefined = undefined;
  public displayHeader: boolean = false;
  public displayMap: boolean = false;

  constructor(
    private footerService: FooterService,
    private router: Router,
    private menuService: MenuService,
    private mapService: MapService,
    private cdr: ChangeDetectorRef,
  ) {}

  private displayHeaderByRoute(event: NavigationEnd): void {
    if (event.url === '/map') {
      this.displayHeader = true;
      this.displayMap = true;
    } else {
      this.displayHeader = false;
      this.displayMap = false;
      this.menuService.updateStateMenu(undefined);
      if (!this.showMenu) return;
      this.menuService.updateStateMenu('close');
    }
  }

  public onMapLoad(map: Map) {
    this.map = map;
    this.mapService.initializeMap(map);
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
      this.footerService.isVisibleState.subscribe((value) => {
        this.isVisible = value;
      }),
    );
    this.subscriptions.add(
      this.menuService.isVisibleState.subscribe((value) => {
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
