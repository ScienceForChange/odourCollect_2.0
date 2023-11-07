import { FooterService } from 'src/app/services/footer.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import {
  NavigationStart,
  Router,
  Event,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public isVisible: boolean = false;
  public showMenu: string | undefined = undefined;
  public displayHeader: boolean = false;
  public displayMap: boolean = false;

  private subscriptions = new Subscription();

  constructor(
    private footerService: FooterService,
    private router: Router,
    private menuService: MenuService,
    private route: ActivatedRoute,
  ) {}

  private displayHeaderByRoute(event: NavigationEnd): void {
    if (event.url === '/map') {
      this.displayHeader = true;
      this.displayMap = true;
    } else {
      this.displayHeader = false;
      this.displayMap = false;
      this.menuService.updateStateMenu(undefined);
      if (!this.showMenu) return;
      this.menuService.updateStateMenu('close');
    }
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.footerService.isVisibleState.subscribe((value) => {
        this.isVisible = value;
      }),
    );
    this.subscriptions.add(
      this.menuService.isVisibleState.subscribe((value) => {
        this.showMenu = value;
      }),
    );
    this.subscriptions.add(
      this.router.events
        .pipe(
          filter(
            (event: Event): event is NavigationEnd =>
              event instanceof NavigationEnd,
          ),
        )
        .subscribe((event: NavigationEnd) => {
          this.displayHeaderByRoute(event);
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
