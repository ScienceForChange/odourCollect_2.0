import { Component, Input } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { MapService } from 'src/app/services/map.service';
import { OffcanvasService } from 'src/app/services/offcanvas.service';

@Component({
  selector: 'app-public-profile-offcanva',
  templateUrl: './public-profile-offcanva.component.html',
  styleUrls: ['./public-profile-offcanva.component.scss'],
})
export class PublicProfileOffcanvaComponent {
  @Input() user!: User;

  constructor(
    public offcanvas: NgbActiveOffcanvas,
    private mapService: MapService,
    private offcanvasService: OffcanvasService,
  ) {}

  showOnMap(observationId: number) {
    this.mapService.seeMoreAbout(observationId, true);
    this.offcanvas.close();
  }

  openAboutTrainedOffcanvas() {
    this.offcanvasService.openAboutTrainedOffcanvas();
  }

  openAboutBadgesOffcanvas() {
    this.offcanvasService.openAboutBadgesOffcanvas();
  }
}
