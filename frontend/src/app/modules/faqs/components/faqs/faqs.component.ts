import { Component } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent {
  constructor(
    private navigationService: NavigationService,
    public offcanvas: NgbActiveOffcanvas
  ) {
    this.navigationService.headerTitle = 'Preguntas frecuentes';
    this.navigationService.footerVisible = false;
  }
}
