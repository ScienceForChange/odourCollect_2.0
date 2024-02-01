import { Component } from '@angular/core';
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
