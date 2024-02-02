import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { OffcanvasService } from '../../../../services/offcanvas.service';

@Component({
  selector: 'app-menu-offcanva',
  templateUrl: './menu-offcanvas.component.html',
  styleUrls: ['./menu-offcanvas.component.scss'],
})
export class MenuOffcanvasComponent implements OnInit, OnDestroy {
  @Input() showMenu!: string | undefined;

  public isLoggedIn!: boolean;

  private subscriptions = new Subscription();

  constructor(
    public authService: AuthService,
    private offCanvasService: OffcanvasService,
    public activeOffcanvas: NgbActiveOffcanvas,
  ) {}
  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.isLoginObs().subscribe((val) => {
        this.isLoggedIn = val;
      }),
    );
  }

  public logout(): void {
    this.authService.logout();
    this.activeOffcanvas.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public openAboutOCOffcanvas(): void {
    this.offCanvasService.openAboutOCOffcanvas();
  }

  public openAboutDataProtectionOffcanvas(): void {
    this.offCanvasService.openAboutDataProtectionOffcanvas();
  }

  public openAboutEthicalIssuesOffcanvas(): void {
    this.offCanvasService.openAboutEthicalIssuesOffcanvas();
  }

  public openFaqsOffcanvas(): void {
    this.offCanvasService.openFaqsOffcanvas();
  }
}
