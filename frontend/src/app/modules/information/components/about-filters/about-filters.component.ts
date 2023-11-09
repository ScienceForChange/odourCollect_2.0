import { Component } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-filters',
  templateUrl: './about-filters.component.html'
})
export class AboutFiltersComponent {

  constructor( public offcanvas: NgbActiveOffcanvas) {} 

}
