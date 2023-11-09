import { Component } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-data-protection',
  templateUrl: './about-data-protection.component.html'
})
export class AboutDataProtectionComponent {
  
  constructor( public offcanvas: NgbActiveOffcanvas){}

}
