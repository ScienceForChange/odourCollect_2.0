import { Component } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { AboutTrainedUserComponent } from 'src/app/modules/information/components/about-trained-user/about-trained-user.component';
import { FooterService } from 'src/app/services/footer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent{
  public user: User | undefined = this.userService.user;

  public showSubmenu: boolean = false;
  public submenuTitle: string = '';

  constructor(
    private footerService: FooterService,
    private userService: UserService,
    private offcanvasService: NgbOffcanvas
  ) {
    this.footerService.visible = true;
  }

  showProfileSubmenu(title: string) {
    this.showSubmenu = true;
    this.submenuTitle = title;
  }
  
  openInfoOffcanvas(){
    this.offcanvasService.open(AboutTrainedUserComponent, {  position: 'start', scroll: false, panelClass: 'about-canvas'});
  }
}
