import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observation } from 'src/app/models/observation';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { OdourService } from 'src/app/services/odour.service';
import { UserService } from 'src/app/services/user.service';
import { MapModalsService } from 'src/app/services/map-modals.service';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { DialogModalComponent } from 'src/app/modules/modals/dialog-modal/dialog-modal.component';
import { PublicProfileOffcanvaComponent } from 'src/app/modules/offcanvas/components/public-profile-offcanva/public-profile-offcanva.component';

@Component({
  selector: 'app-odour-information',
  templateUrl: './odour-information.component.html',
  styleUrls: ['./odour-information.component.scss'],
})
export class OdourInformationComponent implements OnInit, OnDestroy {
  private observation$!: Subscription;
  private observationDelete$!: Subscription;
  private user$!: Subscription;

  public observation!: Observation;
  public isOpen: boolean = false;
  public user: User | undefined = undefined;

  constructor(
    private userService: UserService,
    private odourService: OdourService,
    private alertService: AlertService,
    private mapModalsService: MapModalsService,
    private modalService: NgbModal,
    private offcanvasService: NgbOffcanvas
  ) {}

  ngOnInit(): void {
    this.user = this.userService.user;

    this.mapModalsService.isVisibleState.subscribe((value) => {
      this.isOpen = value.observationInfo;
    });

    // if (this.authService.isLoggedIn && !this.user?.id) {
    //   this.user$ = this.userService.getUser().subscribe({
    //     next: () => {
    //       this.user = this.userService.user;
    //     },
    //   });
    // }

    this.observation$ = this.odourService.observation$.subscribe({
      next: (observation: Observation) => {        
        if (this.observation?.id === observation.id && this.isOpen) return;
        if (this.observation && this.isOpen) {
          this.mapModalsService.toggleObservationModal()
          setTimeout(() => {
            this.observation = observation;
            this.mapModalsService.toggleObservationModal()
          }, 450);
        } else {
          this.observation = observation;
          this.mapModalsService.toggleObservationModal()
        }
      },
      error: (error) => console.error(error),
    });
  }

  send() {
    //Llamamos al modal de confirmación
    const dialog = this.modalService.open( DialogModalComponent, {windowClass: 'default', backdropClass: 'default', centered : true, size: 'sm' } )
    dialog.componentInstance.config = { 
      text: "¿Seguro que quieres eliminar tu observación?",
      acceptButtonText : "Eliminar",
    };
    dialog.result.catch(
      //si el modal se cierra clicando en "Acpetar" llamamos a delete()
      (reason) => { if(reason === true)  this.delete() },
		);
  }

  delete() {
    this.observationDelete$ = this.odourService
      .deleteObservation(this.observation)
      .subscribe({
        next: () => {
          this.mapModalsService.toggleObservationModal();
          this.userService.removeObservation(this.observation);
          this.alertService.success('Observacion eliminada', {
            autoClose: true,
            keepAfterRouteChange: true,
          });
        },
        error: () => {
          this.alertService.error('Hubo un error', {
            autoClose: true,
            keepAfterRouteChange: true,
          });
        },
      });
  }

  public toggleModal() {
    this.mapModalsService.toggleObservationModal();
  }

  ngOnDestroy(): void {
    if (this.user$) this.user$.unsubscribe();
    if (this.observationDelete$) this.observationDelete$.unsubscribe();
    this.observation$.unsubscribe();
  }

  openProfileOffcanva(){
    const offcanva = this.offcanvasService.open(PublicProfileOffcanvaComponent, {  position: 'bottom', scroll: true, panelClass: 'default public-profile', backdropClass: 'default public-profile' });
    offcanva.componentInstance.user = this.observation.relationships.user;
  }

}
