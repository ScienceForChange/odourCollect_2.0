import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent {
  constructor(
    private navigationService: NavigationService,
  ) {
    this.navigationService.headerTitle = 'Preguntas frecuentes';
    this.navigationService.footerVisible = false;
  }
}
