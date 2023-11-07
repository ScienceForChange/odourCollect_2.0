import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Observation } from 'src/app/models/observation';
import { User } from 'src/app/models/user';
import { OdourService } from 'src/app/services/odour.service';

@Component({
  selector: 'app-public-profile-offcanva',
  templateUrl: './public-profile-offcanva.component.html',
  styleUrls: ['./public-profile-offcanva.component.scss']
})
export class PublicProfileOffcanvaComponent {
  
  @Input()  user!: User

  constructor(
    public offcanva: NgbActiveOffcanvas,
    public odourService: OdourService,
    public router: Router,
    ) {
    } 

    
  showOnMap(obs? : Observation){
    //TODO se necesitan los datos relacionados del usuario para terminar el componente
    console.log(this.user)
    if(obs)
    this.odourService.observation$.next(obs);
  }
}
