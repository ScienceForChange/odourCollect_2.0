import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { FooterService } from 'src/app/services/footer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent {
  
  public user: User | undefined = this.userService.user;

  constructor(
    private footerService: FooterService,
    private userService: UserService
  ) {
    this.footerService.visible = true;
  }

}
