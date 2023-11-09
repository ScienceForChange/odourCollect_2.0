import { Component } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-intensity-and-pleasentess',
  templateUrl: './about-intensity-and-pleasentess.component.html'
})
export class AboutIntensityAndPleasentessComponent {
  
  constructor( public offcanvas: NgbActiveOffcanvas) {} 

}
