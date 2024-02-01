import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { NavigationService } from 'src/app/services/navigation.service';
import { OffcanvasService } from 'src/app/services/offcanvas.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent {
  
  public user: User | undefined = this.userService.user;

  constructor(
    private offcanvasService: OffcanvasService,
    private userService: UserService,
    private navigationService: NavigationService,
    ){
      this.navigationService.headerTitle = 'Mis insignias';
    }

    openAboutTrainedOffcanvas() {
      this.offcanvasService.openAboutTrainedOffcanvas();
    }
  
    openAboutBadgesOffcanvas() {
      this.offcanvasService.openAboutBadgesOffcanvas();
    }
}
