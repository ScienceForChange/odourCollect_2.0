import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-about-oddour',
  templateUrl: './about-oddour.component.html',
  styleUrls: ['./about-oddour.component.scss'],
})
export class AboutOddourComponent {
  constructor(
    private navigationService: NavigationService,
  ) {
    this.navigationService.footerVisible = false;
  }
}
