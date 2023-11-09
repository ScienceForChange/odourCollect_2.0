import { Component } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-odour-source',
  templateUrl: './about-odour-source.component.html'
})
export class AboutOdourSourceComponent {

  constructor( public offcanvas: NgbActiveOffcanvas) {
  } 

}
