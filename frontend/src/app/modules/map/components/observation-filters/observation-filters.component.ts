import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  OdourHedonicTone,
  OdourIntensity,
  OdourTypeData,
} from 'src/app/models/odour-related-data';
import { MapModalsService } from 'src/app/services/map-modals.service';
import { OdourService } from 'src/app/services/odour.service';
import { ObservationQuery } from '../../../../models/observation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-observation-filters',
  templateUrl: './observation-filters.component.html',
  styleUrls: ['./observation-filters.component.scss'],
})

//TODO Ver que hacer los errores
export class ObservationFiltersComponent implements OnInit, OnDestroy {
  public isOpen: boolean = false;

  public loading: boolean = false;
  public loadingData: boolean = false;
  public formChanges: boolean = false;

  public types: OdourTypeData[] = [];
  public hedonicTone: OdourHedonicTone[] = [];
  public intensity: OdourIntensity[] = [];

  public hedonicToneForRange!: string[];
  public intensityForRange!: string[];

  public filtersForm!: FormGroup;
  private filtersFormInitialValues!: any;

  private subscriptions = new Subscription();

  constructor(
    private mapModalsService: MapModalsService,
    private odourService: OdourService,
  ) {
    this.loadingData = true;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.mapModalsService.isVisibleState.subscribe((value) => {
        this.isOpen = value.filters;
      }),
    );

    this.subscriptions.add(
      this.odourService.observationRelatedData().subscribe(({ data }) => {
        const filterObservationsSlugs = [
          'waste-water',
          'urban',
          'agriculture-livestock',
          'food-industries',
          'industrial',
        ];
        this.types = data.OdourType.filter((odourType) =>
          filterObservationsSlugs.some((type) => type === odourType.slug),
        );
        this.hedonicTone = data.OdourHedonicTone;
        this.intensity = data.OdourIntensity;

        this.intensityForRange = this.intensity.map(
          (sengment) => sengment.name,
        );
        this.hedonicToneForRange = this.hedonicTone.map(
          (sengment) => sengment.name,
        );

        this.loadingData = false;

        this.filtersForm = new FormGroup({
          type: new FormControl([]),
          intensityMin: new FormControl(0, [
            Validators.min(0),
            Validators.max(this.intensity.length - 1),
          ]),
          intensityMax: new FormControl(this.intensity.length - 1, [
            Validators.min(0),
            Validators.max(this.intensity.length - 1),
          ]),
          hedonicToneMin: new FormControl(0, [
            Validators.min(0),
            Validators.max(this.hedonicTone.length - 1),
          ]),
          hedonicToneMax: new FormControl(this.hedonicTone.length - 1, [
            Validators.min(0),
            Validators.max(this.hedonicTone.length - 1),
          ]),
        });

        this.subscriptions.add(
          this.filtersForm.valueChanges.subscribe(() => {
            this.formChanges = true;
          }),
        );

        this.filtersFormInitialValues = this.filtersForm.value;
      }),
    );
  }

  public toggleFilter(): void {
    this.mapModalsService.toggleFilterModal();
  }

  public addTypeToForm(typeId: number): void {
    const types = this.filtersForm.get('type')?.value || [];
    const index = types.indexOf(typeId);

    if (index === -1) {
      types.push(typeId);
    } else {
      types.splice(index, 1);
    }

    this.filtersForm.get('type')?.setValue(types);
  }

  public resetFilters(): void {
    //TODO esta linea linea habria que evitarla, investigar por que solo type parece referencial
    this.filtersFormInitialValues.type = [];

    this.filtersForm.reset(this.filtersFormInitialValues);
  }

  public filterOdour(): void {
    this.loading = true;

    const querys: ObservationQuery = {
      type:
        this.filtersForm.value.type.length > 0
          ? this.filtersForm.value.type
          : null,
      intensity:
        this.filtersForm.value.intensityMin !== this.intensity[0].power - 1
          ? [
              this.intensity[this.filtersForm.value.intensityMin].power,
              this.intensity[this.filtersForm.value.intensityMax].power,
            ]
          : null,
      hedonicTone:
        this.filtersForm.value.hedonicToneMin !== this.hedonicTone[0].index - 1
          ? [
              this.hedonicTone[this.filtersForm.value.hedonicToneMin].index,
              this.hedonicTone[this.filtersForm.value.hedonicToneMax].index,
            ]
          : null,
    };

    //TODO a la que carlos me suba la rama y me de solo los 5 tipos actualizar filters
    this.subscriptions.add(
      this.odourService.filterOdours(querys).subscribe({
        next: (observations) => {
          const types = [
            'agriculture-livestock',
            'food-industries',
            'industrial',
            'urban',
            'waste-water',
          ];
          const observationsFilteredsByType = observations.data.filter(
            (observation) =>
              types.some(
                (type) =>
                  type ===
                  observation.relationships.odourSubType.relationships.odourType.slug,
              ),
          );
          this.odourService.updateObservations(observationsFilteredsByType);
          this.loading = false;
          this.toggleFilter();
          this.formChanges = false;
        },
        error: (resp) => {
          this.loading = false;
          if (resp.status == 422) {
            //TODO faltan los errores
          }
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
