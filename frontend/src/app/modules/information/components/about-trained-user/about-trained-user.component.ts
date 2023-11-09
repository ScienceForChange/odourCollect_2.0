import { Component } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-trained-user',
  templateUrl: './about-trained-user.component.html'
})
export class AboutTrainedUserComponent {
  
  constructor( public offcanvas: NgbActiveOffcanvas) {
  } 

}
