import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  constructor(private navigationService: NavigationService) {
    this.navigationService.footerVisible = false;
  }
  ngOnInit(): void {
    this.navigationService.mapHeader = false;
    this.navigationService.defaultHeader = false;
  }
}
