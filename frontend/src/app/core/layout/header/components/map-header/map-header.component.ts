import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { InfoModalComponent } from 'src/app/modules/modals/info-modal/info-modal.component';
import { MapService } from 'src/app/services/map.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { DangerComponent } from 'src/app/shared/components/Icons/danger/danger.component';

@Component({
  selector: 'app-map-header',
  templateUrl: './map-header.component.html',
  styleUrls: ['./map-header.component.scss']
})
export class MapHeaderComponent implements OnInit, OnDestroy {
  public showMenu: string | undefined = undefined;
  public showUserObservations: boolean = false;
  private menuServiceSubscription!: Subscription;

  constructor(
    private navigationService: NavigationService,
    private mapService: MapService,
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.menuServiceSubscription = this.navigationService.isVisibleState.subscribe(
      (value) => {
        this.showMenu = value;
      },
    );
  }

  public toggleIsOpen() {
    this.navigationService.toggleVisible();
  }

  public toggleUserOdours(show: boolean) {
    //I've to see if user is logged. If not, I've to show a message
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

  ngOnDestroy(): void {
    this.menuServiceSubscription.unsubscribe();
  }
}
