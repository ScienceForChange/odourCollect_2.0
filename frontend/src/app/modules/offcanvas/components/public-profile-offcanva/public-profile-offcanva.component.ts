import { Component, Input } from '@angular/core';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { AboutBadgesComponent } from 'src/app/modules/information/components/about-badges/about-badges.component';
import { AboutTrainedUserComponent } from 'src/app/modules/information/components/about-trained-user/about-trained-user.component';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-public-profile-offcanva',
  templateUrl: './public-profile-offcanva.component.html',
  styleUrls: ['./public-profile-offcanva.component.scss']
})
export class PublicProfileOffcanvaComponent {
  
  @Input() user!: User;

  constructor(
    public offcanvas: NgbActiveOffcanvas,
    private mapService: MapService,
    private offcanvasService: NgbOffcanvas
    ) {
  } 
    
  showOnMap(observationId: number) {
    this.mapService.seeMoreAbout(observationId);
    this.offcanvas.close();
  }
  
  openAboutTrainedOffcanvas() {
    this.offcanvasService.open(AboutTrainedUserComponent, { position: 'start', scroll: false, panelClass: 'about-canvas' });
  }

  openAboutBadgesOffcanvas() {
    this.offcanvasService.open(AboutBadgesComponent, { position: 'start', scroll: false, panelClass: 'about-canvas' });
  }

}
