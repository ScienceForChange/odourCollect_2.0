import { Component } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-study-zone',
  templateUrl: './about-study-zone.component.html'
})
export class AboutStudyZoneComponent {

  constructor( public offcanvas: NgbActiveOffcanvas) {
  } 

}
