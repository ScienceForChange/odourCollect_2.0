import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ObservationFiltersOffCanvaComponent } from 'src/app/modules/offcanvas/components/observation-filters-offcanva/observation-filters-offcanva.component';
import { MapModalsService } from 'src/app/services/map-modals.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  public isVisible: boolean = false;
  private mapModalsServiceSubscription!: Subscription;

  constructor(
    private mapModalsService: MapModalsService,
    private offcanvasService: NgbOffcanvas,
  ) {}

  ngOnInit(): void {
    this.mapModalsServiceSubscription =
      this.mapModalsService.isVisibleState.subscribe((value) => {
        this.isVisible = value.filters;
      });
  }

  public toggleFilter() {
    // this.mapModalsService.toggleFilterModal();
     this.offcanvasService.open(
      ObservationFiltersOffCanvaComponent,
      {
        position: 'bottom',
        scroll: true,
        panelClass: 'default info-observation',
        backdrop: false,
        backdropClass: 'default info-observation',
      },
    );
    console.log('click')
  }

  ngOnDestroy(): void {
    this.mapModalsServiceSubscription.unsubscribe();
  }
}
