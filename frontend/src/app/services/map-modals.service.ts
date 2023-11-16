import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface mapModals {
  filters: boolean;
  observationInfo: boolean;
  lastOdours: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MapModalsService {
  private _modalVisible = new BehaviorSubject<mapModals>({
    filters: false,
    observationInfo: false,
    lastOdours: false,
  });

  set modalsVisible(value: mapModals) {
    this._modalVisible.next(value);
  }

  get isVisibleState() {
    return this._modalVisible;
  }

  toggleFilterModal(): void {
    this.modalsVisible = {
      filters: !this._modalVisible.value.filters,
      observationInfo: false,
      lastOdours: false,
    };
  }

  toggleObservationModal(): void {
    this.modalsVisible = {
      filters: false,
      observationInfo: !this._modalVisible.value.observationInfo,
      lastOdours: false,
    };
  }
  
  toggleLastOdoursModal(): void {
    this.modalsVisible = {
      filters: false,
      observationInfo: false,
      lastOdours: !this._modalVisible.value.lastOdours,
    };
  }
}
