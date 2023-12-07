import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from '../../../../../services/menu.service';
import { Subscription } from 'rxjs';
import { MapService } from '../../../../../services/map.service';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoModalComponent } from 'src/app/modules/modals/info-modal/info-modal.component';
import { DangerComponent } from 'src/app/shared/components/Icons/danger/danger.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public showMenu: string | undefined = undefined;
  public showUserObservations: boolean = false;
  private menuServiceSubscription!: Subscription;

  constructor(
    private menuService: MenuService,
    private mapService: MapService,
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.menuServiceSubscription = this.menuService.isVisibleState.subscribe(
      (value) => {
        this.showMenu = value;
      },
    );
  }

  public toggleIsOpen() {
    this.menuService.toggleVisible();
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
