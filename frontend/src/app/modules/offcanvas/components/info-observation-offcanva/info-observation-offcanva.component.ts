import { Component, ViewChild } from '@angular/core';
import { NgbActiveOffcanvas, NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, filter } from 'rxjs';
import { Observation } from 'src/app/models/observation';
import { User } from 'src/app/models/user';
import { DialogModalComponent } from 'src/app/modules/modals/dialog-modal/dialog-modal.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { MapModalsService } from 'src/app/services/map-modals.service';
import { OdourService } from 'src/app/services/odour.service';
import { UserService } from 'src/app/services/user.service';
import { HeartComponent } from 'src/app/shared/components/Icons/heart/heart.component';
import { PublicProfileOffcanvaComponent } from '../public-profile-offcanva/public-profile-offcanva.component';
import { RegisterModalComponent } from 'src/app/modules/modals/register-modal/register-modal.component';
import { DangerComponent } from 'src/app/shared/components/Icons/danger/danger.component';
import { NavigationEnd, Router } from '@angular/router';
import { CommentsOffcanvaComponent } from '../comments-offcanva/comments-offcanva.component';

@Component({
  selector: 'app-info-observation-offcanva',
  templateUrl: './info-observation-offcanva.component.html',
  styleUrls: ['./info-observation-offcanva.component.scss']
})
export class InfoObservationOffcanvaComponent {
  @ViewChild(HeartComponent) heartIcon!:HeartComponent;

  private user$!: Subscription;
  private subscriptions = new Subscription();  
  
  public observation!: Observation;
  public isOpen: boolean = false;
  public user: User | undefined = undefined;
  
  constructor(
    public offcanvas: NgbActiveOffcanvas,
    private userService: UserService,
    private authService: AuthService,
    private odourService: OdourService,
    private alertService: AlertService,
    private mapModalsService: MapModalsService,
    private modalService: NgbModal,
    private offcanvasService: NgbOffcanvas,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.user = this.userService.user;
    this.subscriptions.add(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.offcanvas.dismiss();
      })
    );
  }

  public send() {
    const dialog = this.modalService.open(DialogModalComponent, {
      windowClass: 'default',
      backdropClass: 'default',
      centered: true,
      size: 'sm',
    });
    dialog.componentInstance.config = {
      text: '¿Seguro que quieres eliminar tu observación?',
      acceptButtonText: 'Eliminar',
    };
    dialog.result.catch((reason) => {
      if (reason === true) this.delete();
    });
  }

  private delete() {
    this.subscriptions.add(
      this.odourService.deleteObservation(this.observation.id).subscribe({
        next: () => {
          this.mapModalsService.toggleObservationModal();
          this.userService.removeObservation(this.observation.id);
          // this.mapService.deleteMarker(this.observation.id);
          //DEBERIA ELIMINARLO DEL ARRAY DE OBSERVACIONES
          this.alertService.success('Observación eliminada', {
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
      }),
    );
  }

  openProfileOffcanva() {
    const offcanva = this.offcanvasService.open(
      PublicProfileOffcanvaComponent,
      {
        position: 'bottom',
        scroll: true,
        panelClass: 'default public-profile',
        backdropClass: 'default public-profile',
      },
    );
    offcanva.componentInstance.user = this.observation.relationships.user;
  }

  toggleObservationLike() {
    if(this.authService.isLoggedIn.value) {

      if(this.observation.liked)
      this.odourService.deleteObservationLike(this.observation.id).subscribe({
        next: (resp: any) => {
          this.observation.likes = resp.likes;
          this.observation.liked = false;         
        }
      });

      else
      this.odourService.addObservationLike(this.observation.id).subscribe({
        next: (resp: any) => {
          this.observation.likes = resp.likes;
          this.observation.liked = true;   
          this.heartIcon.heartsEffect();        
        }
      });
      
    }
    else {
      this.modalService
      .open(
        RegisterModalComponent, { 
          windowClass: 'default', 
          backdropClass: 'default', 
          centered : true, 
          size: 'sm' 
        }
      )
      .componentInstance.config = {
        icon: DangerComponent,
        text: "Debes iniciar sesión para poder dar 'Me gusta'",
      };
    }
  }

  openCommentaries(addCommnetary: boolean = false) {
    if(this.userService.user) {
      const offcanva = this.offcanvasService.open(
        CommentsOffcanvaComponent,
        {
          position: 'bottom',
          scroll: true,
          panelClass: 'default comments',
          backdropClass: 'default comments',
        },
      );
      offcanva.componentInstance.user = this.user;
      offcanva.componentInstance.observation = this.observation;
      offcanva.componentInstance.addCommnetary = addCommnetary;
    }
    else {
      this.modalService
      .open(
        RegisterModalComponent, { 
          windowClass: 'default', 
          backdropClass: 'default', 
          centered : true, 
          size: 'sm' 
        }
      )
      .componentInstance.config = {
        icon: DangerComponent,
        text: "Debes iniciar sesión para poder dejar un comentario",
      };
    }
  }

  ngOnDestroy(): void {
    if (this.user$) this.user$.unsubscribe();
    this.subscriptions.unsubscribe();
  }
}
