import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from '../../../../../services/menu.service';
import { Subscription } from 'rxjs';
import { MapService } from '../../../../../services/map.service';

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
