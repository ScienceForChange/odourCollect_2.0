import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from '../../../../../services/menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public showMenu: string | undefined = undefined;

  private menuServiceSubscription!: Subscription;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuServiceSubscription = this.menuService.isVisibleState.subscribe(
      (value) => {
        this.showMenu = value;
      }
    );
  }

  public toggleIsOpen() {
    this.menuService.toggleVisible();
  }

  ngOnDestroy(): void {
    this.menuServiceSubscription.unsubscribe();
  }
}
