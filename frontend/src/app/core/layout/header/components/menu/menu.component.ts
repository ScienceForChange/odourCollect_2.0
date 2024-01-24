import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AboutDataProtectionComponent } from 'src/app/modules/information/components/about-data-protection/about-data-protection.component';
import { AboutEthicalIssuesComponent } from 'src/app/modules/information/components/about-ethical-issues/about-ethical-issues.component';
import { AboutOdourCollectComponent } from 'src/app/modules/information/components/about-odour-collect/about-odour-collect.component';

import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';

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
    private navigationService: NavigationService,
    private offcanvasService: NgbOffcanvas,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.isLoginObs().subscribe((val) => {
        this.isLoggedIn = val;
      }),
    );
    this.subscriptions.add(
      this.navigationService.isVisibleState.subscribe((value) => {
        this.showMenu = value;
      }),
    );
  }

  public logout(): void {
    this.authService.logout();
    this.navigationService.toggleVisible();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public openAboutOCOffcanvas(): void {
    this.offcanvasService.open(AboutOdourCollectComponent, {
      position: 'start',
      scroll: false,
      panelClass: 'about-canvas',
    });
  }

  public openAboutDataProtectionOffcanvas(): void {
    this.offcanvasService.open(AboutDataProtectionComponent, {
      position: 'start',
      scroll: false,
      panelClass: 'about-canvas',
    });
  }

  public openAboutEthicalIssuesOffcanvas(): void {
    this.offcanvasService.open(AboutEthicalIssuesComponent, {
      position: 'start',
      scroll: false,
      panelClass: 'about-canvas',
    });
  }
}
