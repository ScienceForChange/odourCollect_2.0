import { Component } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { AboutBadgesComponent } from 'src/app/modules/information/components/about-badges/about-badges.component';
import { AboutTrainedUserComponent } from 'src/app/modules/information/components/about-trained-user/about-trained-user.component';
import { MapService } from 'src/app/services/map.service';
import { OffcanvasService } from 'src/app/services/offcanvas.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss'],
})
export class PublicProfileComponent {
  public user: User | undefined = this.userService.user;

  constructor(
    private userService: UserService,
    private mapService: MapService,
    private offcanvasService: OffcanvasService,
  ) {}
  showOnMap(observationId: number) {
    this.mapService.seeMoreAbout(observationId, true);
  }

  openAboutTrainedOffcanvas() {
    this.offcanvasService.openAboutTrainedOffcanvas();
  }

  openAboutBadgesOffcanvas() {
    this.offcanvasService.openAboutBadgesOffcanvas();
  }
}
