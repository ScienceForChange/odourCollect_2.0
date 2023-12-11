import { Component, OnDestroy, OnInit } from '@angular/core';
import { FooterService } from '../../../../../../services/footer.service';
import { OdourService } from '../../../../../../services/odour.service';
import { MapService } from 'src/app/services/map.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study-zone',
  templateUrl: './study-zone.component.html',
  styleUrls: ['./study-zone.component.scss'],
})
export class StudyZoneComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  constructor(
    private footerService: FooterService,
    private odourService: OdourService,
    private mapService: MapService,
  ) {
    this.footerService.visible = true;
  }

  ngOnInit(): void {
    this.odourService.getStudyZone();
    this.subscriptions.add(
      this.odourService.studyZone.subscribe((studyZone) => {
        const map = this.mapService.getMap();
        if (studyZone && map) {
          const [lat, lon] = studyZone.features[0].geometry.coordinates[0][0];
          this.mapService.centerMap(lon, lat, 10);
        }
      }),
    );
    this.mapService.resizeMap();
  }

  ngOnDestroy(): void {
    this.odourService.updateStudyZone(undefined);
    this.subscriptions.unsubscribe();
  }
}
