import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  @Input() showMenu!: string | undefined;

  public isLoggedIn!: boolean;

  private subscriptions = new Subscription();

  constructor(
    public authService: AuthService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.isLoginObs().subscribe((val) => {
        this.isLoggedIn = val;
      })
    );
    this.subscriptions.add(
      this.menuService.isVisibleState.subscribe((value) => {
        this.showMenu = value;
      })
    );
  }

  public logout() {
    this.authService.logout();
    this.menuService.toggleVisible();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
