import { Component } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-badges',
  templateUrl: './about-badges.component.html',
  styleUrls: ['./about-badges.component.scss']
})
export class AboutBadgesComponent { 
  
  constructor( public offcanvas: NgbActiveOffcanvas) {
  } 

}
