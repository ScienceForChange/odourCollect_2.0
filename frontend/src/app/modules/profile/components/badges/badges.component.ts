import { Component } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { AboutBadgesComponent } from 'src/app/modules/information/components/about-badges/about-badges.component';
import { AboutTrainedUserComponent } from 'src/app/modules/information/components/about-trained-user/about-trained-user.component';
import { FooterService } from 'src/app/services/footer.service';
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
    private footerService: FooterService
    ){
      this.footerService.visible = true;
    }

  openAboutTrainedOffcanvas() {
    this.offcanvasService.open(AboutTrainedUserComponent, { position: 'start', scroll: false, panelClass: 'about-canvas' });
  }

  openAboutBadgesOffcanvas() {
    this.offcanvasService.open(AboutBadgesComponent, { position: 'start', scroll: false, panelClass: 'about-canvas' });
  }
}
