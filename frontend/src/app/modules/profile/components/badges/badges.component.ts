import { Component } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { AboutBadgesComponent } from 'src/app/modules/information/components/about-badges/about-badges.component';
import { AboutTrainedUserComponent } from 'src/app/modules/information/components/about-trained-user/about-trained-user.component';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent {
  
  public user: User | undefined = this.userService.user;

  constructor(
    private offcanvasService: NgbOffcanvas,
    private userService: UserService,
    private navigationService: NavigationService,
    ){
      this.navigationService.headerTitle = 'Mis insignias';
    }

  openAboutTrainedOffcanvas() {
    this.offcanvasService.open(AboutTrainedUserComponent, { position: 'start', scroll: false, panelClass: 'about-canvas' });
  }

  openAboutBadgesOffcanvas() {
    this.offcanvasService.open(AboutBadgesComponent, { position: 'start', scroll: false, panelClass: 'about-canvas' });
  }
}
