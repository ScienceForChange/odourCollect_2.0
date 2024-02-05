import { Component, Input } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { MapService } from 'src/app/services/map.service';
import { OffcanvasService } from 'src/app/services/offcanvas.service';

@Component({
  selector: 'app-public-profile-offcanva',
  templateUrl: './public-profile-offcanvas.component.html',
  styleUrls: ['./public-profile-offcanvas.component.scss'],
})
export class PublicProfileOffcanvasComponent {
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
