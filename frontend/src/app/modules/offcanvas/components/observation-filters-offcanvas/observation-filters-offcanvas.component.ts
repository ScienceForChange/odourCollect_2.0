import { Component, OnDestroy, OnInit, inject } from '@angular/core';
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
import { AlertService } from 'src/app/services/alert.service';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { OffcanvasService } from 'src/app/services/offcanvas.service';

const date = new Date();
date.setDate(date.getDate() - 1);
const yesterday = date
  .toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  .replace(/\//g, '-');
const today = new Date()
  .toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  .replace(/\//g, '-');

@Component({
  selector: 'app-observation-filters-offcanva',
  templateUrl: './observation-filters-offcanvas.component.html',
  styleUrls: ['./observation-filters-offcanvas.component.scss'],
})
export class ObservationFiltersOffCanvasComponent implements OnInit, OnDestroy {
  public isOpen: boolean = false;

  public loading: boolean = false;
  public loadingData: boolean = false;
  public formChanges: boolean = false;

  public types: OdourTypeData[] = [];
  public hedonicTone: OdourHedonicTone[] = [];
  public intensity: OdourIntensity[] = [];

  public hedonicToneForRange!: string[];
  public intensityForRange!: string[];
  public hourForRange: string[] = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12;
    const period = i < 12 ? ':00 am' : ':00 pm';
    return `${hour < 10 ? '0' + hour : hour}${period}`;
  });
  private hoursToSend = Array.from({ length: 24 }, (_, i) => {
    return i < 10 ? '0' + i + ':00' : i + ':00';
  });
  public distanceRange: string[] = ['1km', '3km', '5km', '7km', '9km', '10km'];
  public dateRange: string[] = [yesterday, today];

  public filtersForm!: FormGroup;
  private filtersFormInitialValues!: any;

  private subscriptions = new Subscription();

  constructor(
    private mapModalsService: MapModalsService,
    private odourService: OdourService,
    private alertService: AlertService,
    private offcanvasService: OffcanvasService,
    public activeOffcanvas: NgbActiveOffcanvas
  ) {
    this.loadingData = true;
  }

  ngOnInit(): void {
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
          createdBetween: new FormControl(this.dateRange),
          hourMin: new FormControl(0, [
            Validators.min(0),
            Validators.max(this.hourForRange.length - 1),
          ]),
          hourMax: new FormControl(this.hourForRange.length - 1, [
            Validators.min(0),
            Validators.max(this.hourForRange.length - 1),
          ]),
          distance: new FormControl(0),
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
          this.filtersForm.statusChanges.subscribe(() => {
            const isAnyQuerySelected = Object.keys(
              this.filtersForm.controls,
            ).some((key) => this.filtersForm.controls[key].valid);

            this.formChanges = isAnyQuerySelected;
          }),
        );

        this.filtersFormInitialValues = this.filtersForm.value;
      }),
    );
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
    this.filtersFormInitialValues.type = [];
    this.filtersForm.reset(this.filtersFormInitialValues);
    for (const control in this.filtersForm.controls) {
      this.filtersForm.controls[control].setErrors({ incorrect: true });
    }
  }

  public filterOdour(): void {
    this.loading = true;
    const formValues = this.filtersForm.value;
    let querysSelected: ObservationQuery = {
      type: null,
      intensity: null,
      hedonicTone: null,
      createdBetween: null,
      createdTodayBetween: null,
    };
    for (const control in this.filtersForm.controls) {
      if (this.filtersForm.controls[control].valid) {
        switch (control) {
          case 'intensityMax':
          case 'intensityMin':
            if (formValues.intensityMin !== this.intensity[0].power - 1) {
              querysSelected = {
                ...querysSelected,
                intensity: [
                  this.intensity[formValues.intensityMin].power,
                  this.intensity[formValues.intensityMax].power,
                ],
              };
            }
            break;
          case 'hedonicToneMax':
          case 'hedonicToneMin':
            if (formValues.hedonicToneMin !== this.hedonicTone[0].index - 1) {
              querysSelected = {
                ...querysSelected,
                hedonicTone: [
                  this.hedonicTone[formValues.hedonicToneMin].index,
                  this.hedonicTone[formValues.hedonicToneMax].index,
                ],
              };
            }
            break;
          case 'hourMax':
          case 'hourMin':
            if (formValues.hourMin !== this.hourForRange[0]) {
              querysSelected = {
                ...querysSelected,
                createdTodayBetween: [
                  this.hoursToSend[formValues.hourMin],
                  this.hoursToSend[formValues.hourMax],
                ],
              };
            }
            break;
          case 'type':
            if (!formValues.type.length) {
              querysSelected = {
                ...querysSelected,
                type: [1, 2, 3, 4, 5],
              };
            } else {
              querysSelected = {
                ...querysSelected,
                type: formValues.type,
              };
            }
            break;
          case 'distance':
            break;
          default:
            querysSelected = {
              ...querysSelected,
              [control]: formValues[control],
            };
        }
      }
    }

    this.subscriptions.add(
      this.odourService.filterOdours(querysSelected).subscribe({
        next: (observations) => {
          if (!observations.data.length) {
            this.alertService.info('No hay observaciones con esos filtros', {
              autoClose: true,
            });
          } else {
            this.alertService.success(
              `Se econtraron ${observations.data.length} observaciones `,
              {
                autoClose: true,
              },
            );
          }
          this.odourService.updateObservations(observations.data);
          this.loading = false;
          this.activeOffcanvas.close();
          this.formChanges = false;
        },
        error: (resp) => {
          this.loading = false;
          if (resp.status == 422) {
            console.error(resp.status);
          }
        },
      }),
    );
  }

  public openAboutFiltersOffcanva(): void {
    this.offcanvasService.openAboutFiltersOffcanvas();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
