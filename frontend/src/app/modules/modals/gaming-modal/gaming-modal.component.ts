import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { OffcanvasService } from 'src/app/services/offcanvas.service';

@Component({
  selector: 'app-gaming-modal',
  templateUrl: './gaming-modal.component.html',
  styleUrls: ['./gaming-modal.component.scss']
})
export class GamingModalComponent {
  @Input() config: {
    id:                 number,
    title:              string | null,
    text:               string | null,
  } = {
    id:                 0,
    title:              '¡Felicidades!',
    text:               'Has ganado una insignia',
  };
  public trophyName : string[] = [
    'Informador/a',
    'Explorador/a',
    'Comunidad',
    'Contribuyente',
    'Expeorto/a',
  ];
  constructor(
    public modal: NgbActiveModal,
    private route: Router,
  ) {}

  openAboutBadgesOffcanvas() {
    this.modal.close();
    this.route.navigate(['/profile/badges']);
  }
}
