import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapModalsService } from 'src/app/services/map-modals.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})

export class FiltersComponent implements OnInit, OnDestroy {
  public isVisible: boolean = false;
  private mapModalsServiceSubscription!: Subscription;

  constructor(private mapModalsService: MapModalsService) {}

  ngOnInit(): void {
    this.mapModalsServiceSubscription =
      this.mapModalsService.isVisibleState.subscribe((value) => {
        this.isVisible = value.filters;
      });
  }

  public toggleFilter() {
    this.mapModalsService.toggleFilterModal();
  }

  ngOnDestroy(): void {
    this.mapModalsServiceSubscription.unsubscribe();
  }
}
