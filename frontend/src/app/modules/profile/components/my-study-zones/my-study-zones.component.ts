import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-my-study-zones',
  templateUrl: './my-study-zones.component.html',
  styleUrls: ['./my-study-zones.component.scss'],
})
export class MyStudyZonesComponent {
  constructor(
    private navigationService: NavigationService) {
    this.navigationService.headerTitle = 'Mis zonas de estudio';
  }
}
