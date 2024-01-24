import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '../../../../../services/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hamburguer',
  templateUrl: './hamburguer.component.html',
  styleUrls: ['./hamburguer.component.scss'],
})
export class HamburguerComponent implements OnInit, OnDestroy {
  public showMenu: string | undefined = undefined;
  private menuServiceSubscription!: Subscription;

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.menuServiceSubscription = this.navigationService.isVisibleState.subscribe(
      (value) => {
        this.showMenu = value;
      }
    );
  }

  ngOnDestroy(): void {
    this.menuServiceSubscription.unsubscribe();
  }
}
