import {
  AfterViewChecked,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbActiveOffcanvas, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, filter } from 'rxjs';
import { Observation } from 'src/app/models/observation';
import { User } from 'src/app/models/user';
import { DialogModalComponent } from 'src/app/modules/modals/dialog-modal/dialog-modal.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { OdourService } from 'src/app/services/odour.service';
import { UserService } from 'src/app/services/user.service';
import { HeartComponent } from 'src/app/shared/components/Icons/heart/heart.component';
import { RegisterModalComponent } from 'src/app/modules/modals/register-modal/register-modal.component';
import { DangerComponent } from 'src/app/shared/components/Icons/danger/danger.component';
import { NavigationEnd, Router } from '@angular/router';
import { MapService } from 'src/app/services/map.service';
import { OffcanvasService } from 'src/app/services/offcanvas.service';

@Component({
  selector: 'app-info-observation-offcanvas',
  templateUrl: './info-observation-offcanvas.component.html',
  styleUrls: ['./info-observation-offcanvas.component.scss'],
})
export class InfoObservationOffcanvasComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  @ViewChild(HeartComponent) heartIcon!: HeartComponent;

  private user$!: Subscription;
  private subscriptions = new Subscription();
  private closeByUser: boolean = false;

  public observation!: Observation;
  public user: User | undefined = undefined;

  constructor(
    private activeOffcanvas: NgbActiveOffcanvas,
    private userService: UserService,
    private authService: AuthService,
    private odourService: OdourService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private offcanvasService: OffcanvasService,
    private mapService: MapService,
    private router: Router,
 ) {}

  ngOnInit(): void {
    this.user = this.userService.user;
    this.subscriptions.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this.activeOffcanvas.close();
        }),
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
          this.userService.removeObservation(this.observation.id);
          // this.mapService.deleteMarker(this.observation.id);
          //DEBERIA ELIMINARLO DEL ARRAY DE OBSERVACIONES
          this.alertService.success('Observación eliminada', {
            autoClose: true,
            keepAfterRouteChange: true,
          });
          this.activeOffcanvas.close();
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

  public resizeOffcanva() {
    const offcanvaBody = document.querySelector(
      '.offcanvas-body',
    ) as HTMLElement;
    offcanvaBody.style.height = offcanvaBody.scrollHeight + 'px';
  }
  ngAfterViewChecked() {
    this.resizeOffcanva();
  }
  public openProfileOffcanvas() {
    this.offcanvasService.openProfileOffcanvas(this.observation);
  }

  public toggleObservationLike() {
    if (this.authService.isLoggedIn.value) {
      if (this.observation.liked)
        this.odourService.deleteObservationLike(this.observation.id).subscribe({
          next: (resp: any) => {
            this.observation.likes = resp.likes;
            this.observation.liked = false;
          },
        });
      else
        this.odourService.addObservationLike(this.observation.id).subscribe({
          next: (resp: any) => {
            this.observation.likes = resp.likes;
            this.observation.liked = true;
            this.heartIcon.heartsEffect();
          },
        });
    } else {
      this.modalService.open(RegisterModalComponent, {
        windowClass: 'default',
        backdropClass: 'default',
        centered: true,
        size: 'sm',
      }).componentInstance.config = {
        icon: DangerComponent,
        text: "Debes iniciar sesión para poder dar 'Me gusta'",
      };
    }
  }

  public openCommentaries(addCommnetary: boolean = false) {
    if (this.userService.user) {
      this.offcanvasService.openCommentsOffcanvasComponent(
        this.user,
        this.observation,
        addCommnetary,
      );
    } else {
      this.modalService.open(RegisterModalComponent, {
        windowClass: 'default',
        backdropClass: 'default',
        centered: true,
        size: 'sm',
      }).componentInstance.config = {
        icon: DangerComponent,
        text: 'Debes iniciar sesión para poder dejar un comentario',
      };
    }
  }
  public close(): void {
    this.closeByUser = true;
    this.activeOffcanvas.close();
  }

  ngOnDestroy(): void {
    if (this.user$) this.user$.unsubscribe();
    this.subscriptions.unsubscribe();
    if (this.closeByUser) this.mapService.observation = null;
  }
}
