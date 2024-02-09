import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import { Observation } from 'src/app/models/observation';
import {
  OdourHedonicTone,
  OdourIntensity,
  OdourTypeData,
} from 'src/app/models/odour-related-data';
import { OdourService } from 'src/app/services/odour.service';
import { OffcanvasService } from 'src/app/services/offcanvas.service';

@Component({
  selector: 'app-filters-myodours-offcanvas',
  templateUrl: './filters-my-odours-offcanvas.component.html',
  styleUrls: ['./filters-my-odours-offcanvas.component.scss'],
})
export class FiltersMyOdoursOffcanvasComponent implements OnInit, OnDestroy {
  @Input() observationsRef!: Observation[] | undefined;
  @Input() observations$!: BehaviorSubject<Observation[] | undefined>;

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
    private odourService: OdourService,
    private offcanvasService: OffcanvasService,
    public activeOffCanvas: NgbActiveOffcanvas,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.odourService.observationRelatedData().subscribe(({ data }) => {
        const filterObservationsSlugs = [
          'wastewater-and-waste',
          'urban',
          'country-and-nature',
          'food',
          'industry',
        ];
        this.types = data.OdourType?.filter((odourType) =>
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

  public resetFilters(): void {
    this.observations$.next(this.observationsRef);
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
  //
  public resetDefaultFilters(): void {
    this.filtersFormInitialValues.type = [];
    this.resetFilters();
    this.filtersForm.reset(this.filtersFormInitialValues);
  }

  public filterObservations(querys: {
    type: [];
    intensity: number[] | null;
    hedonicTone: number[] | null;
  }) {
    const observationsFiltered = this.observationsRef?.filter((observation) => {
      const observationType =
        observation?.relationships?.odourSubType?.relationships?.odourType.id;
      const observationIntensity = observation?.relationships?.odourIntensity?.id;
      const observationHedonicTone =
        observation?.relationships?.odourHedonicTone?.id;

      const haveSameType = querys.type.length
        ? querys.type.some((type: number) => type === observationType)
        : true;

      let haveSameIntensity;
      let haveSameHedonictone;

      if (querys.intensity !== null && observationIntensity) {
        haveSameIntensity =
          querys.intensity[0] <= observationIntensity &&
          querys.intensity[1] >= observationIntensity;
      }

      if (querys.hedonicTone !== null && observationHedonicTone) {
        haveSameHedonictone =
          querys.hedonicTone[0] <= observationHedonicTone &&
          querys.hedonicTone[1] >= observationHedonicTone;
      }

      return haveSameType && haveSameIntensity && haveSameHedonictone;
    });

    this.observations$.next(observationsFiltered);
  }

  public filterOdour(): void {
    const filters: {
      type: [];
      intensity: number[] | null;
      hedonicTone: number[] | null;
    } = {
      type: this.filtersForm.value.type,
      intensity:
        this.filtersForm.value.intensityMin !== this.intensity[0].power - 1
          ? [
              this.intensity[this.filtersForm.value.intensityMin].id,
              this.intensity[this.filtersForm.value.intensityMax].id,
            ]
          : null,
      hedonicTone:
        this.filtersForm.value.hedonicToneMin !== this.hedonicTone[0].index - 1
          ? [
              this.hedonicTone[this.filtersForm.value.hedonicToneMin].id,
              this.hedonicTone[this.filtersForm.value.hedonicToneMax].id,
            ]
          : null,
    };
    this.filterObservations(filters);
    this.activeOffCanvas.close();
  }

  public openAboutFiltersOffcanva(): void {
    this.offcanvasService.openAboutFiltersOffcanvas();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
