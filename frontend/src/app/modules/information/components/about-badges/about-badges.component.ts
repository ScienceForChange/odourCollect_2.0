import { Component } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-badges',
  templateUrl: './about-badges.component.html'
})
export class AboutBadgesComponent { 
  
  constructor( public offcanvas: NgbActiveOffcanvas) {
  } 

}
