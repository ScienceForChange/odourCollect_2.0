import { Component } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-ethical-issues',
  templateUrl: './about-ethical-issues.component.html'
})
export class AboutEthicalIssuesComponent {

  constructor( public offcanvas: NgbActiveOffcanvas){}

}
