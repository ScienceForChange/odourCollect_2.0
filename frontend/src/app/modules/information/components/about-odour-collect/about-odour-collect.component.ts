import { Component } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-odour-collect',
  templateUrl: './about-odour-collect.component.html'
})
export class AboutOdourCollectComponent {

  constructor( public offcanvas: NgbActiveOffcanvas) {
  } 

}
