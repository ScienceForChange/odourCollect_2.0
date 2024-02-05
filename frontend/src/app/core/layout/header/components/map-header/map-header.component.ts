import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoModalComponent } from 'src/app/modules/modals/info-modal/info-modal.component';
import { MapService } from 'src/app/services/map.service';
import { UserService } from 'src/app/services/user.service';
import { DangerComponent } from 'src/app/shared/components/Icons/danger/danger.component';
import { OffcanvasService } from '../../../../../services/offcanvas.service';

@Component({
  selector: 'app-map-header',
  templateUrl: './map-header.component.html',
  styleUrls: ['./map-header.component.scss']
})
export class MapHeaderComponent {
  public showMenu: string | undefined = undefined;
  public showUserObservations: boolean = false;

  constructor(
    private mapService: MapService,
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal,
    private OffcanvasService:OffcanvasService
  ) {}

  public openMenuOffCanvas() {
    this.OffcanvasService.openMenuOffCanvas();
  }

  public openLegendOffCanvas(): void {
    this.OffcanvasService.openLegendOffCanvas();
  }

  public toggleUserOdours(show: boolean) {
    if (!this.userService.user) {
      this.modalService.open(InfoModalComponent, {
        windowClass: 'default',
        backdropClass: 'default',
        centered: true,
        size: 'sm',
      }).componentInstance.config = {
        icon: DangerComponent,
        text: 'Debes estar registrado/a para ver tus olores.',
        acceptButtonText: 'Registrarme',
        buttonCallBack: () => this.router.navigate(['/login']),
      };
      return;
    }
    if (!this.userService.user.relationships.odourObservations.length) {
      this.modalService.open(InfoModalComponent, {
        windowClass: 'default',
        backdropClass: 'default',
        centered: true,
        size: 'sm',
      }).componentInstance.config = {
        icon: DangerComponent,
        text: 'No tienes ningún olor registrado. ¡Registra uno!',
        acceptButtonText: 'Registrar olor',
        buttonCallBack: () => this.router.navigate(['/create-odour']),
      };
      return;
    }
    //I've isLogged but have no observations I've to show a message
    this.showUserObservations = show;
    this.mapService.showUserObservations.next(show);
  }

  public centerToMyLocation() {
    this.mapService.centerMapToMyLatLng();
  }
}
