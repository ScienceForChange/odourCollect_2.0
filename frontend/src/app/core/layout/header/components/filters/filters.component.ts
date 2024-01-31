import { Component } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ObservationFiltersOffCanvaComponent } from 'src/app/modules/offcanvas/components/observation-filters-offcanva/observation-filters-offcanva.component';
import { OffcanvasService } from 'src/app/services/offcanvas.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  public isVisible: boolean = false;

  constructor(private offcanvasService: OffcanvasService) {}

  public openFilter() {
    this.isVisible = true;
    this.offcanvasService.openMapFiltersOffCanvas();
  }
}
