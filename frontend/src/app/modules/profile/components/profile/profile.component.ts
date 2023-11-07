import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
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
  ) {
    this.footerService.visible = true;
  }

  showProfileSubmenu(title: string) {
    this.showSubmenu = true;
    this.submenuTitle = title;
  }
}
