import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from '../../../../../services/menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hamburguer',
  templateUrl: './hamburguer.component.html',
  styleUrls: ['./hamburguer.component.scss'],
})
export class HamburguerComponent implements OnInit, OnDestroy {
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

  ngOnDestroy(): void {
    this.menuServiceSubscription.unsubscribe();
  }
}
