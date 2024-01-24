import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent {
  
  public user: User | undefined = this.userService.user;

  constructor(
    private userService: UserService,
    private navigationService: NavigationService
  ) {
    this.navigationService.headerTitle = 'Configuración de la cuenta';
  }

}
