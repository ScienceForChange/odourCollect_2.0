import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observation } from 'src/app/models/observation';
import { User } from 'src/app/models/user';
import { FooterService } from 'src/app/services/footer.service';
import { MapService } from 'src/app/services/map.service';
import { OdourService } from 'src/app/services/odour.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent{

  public user: User | undefined = this.userService.user;
  
  constructor(
    private footerService: FooterService,
    private userService: UserService,
    private odourService: OdourService,
    private router: Router,
    private mapService: MapService
    ) {
      this.footerService.visible = true;
  }
  showOnMap(obs : Observation){
    this.odourService.observation$.next(obs);
    this.mapService.centerMap(Number(obs.latitude), Number(obs.longitude))
    this.router.navigate(['/map']);
  }
}
