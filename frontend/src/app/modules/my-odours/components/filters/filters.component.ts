import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import {
  OdourHedonicTone,
  OdourIntensity,
  OdourTypeData,
} from 'src/app/models/odour-related-data';
import { AboutFiltersComponent } from 'src/app/modules/information/components/about-filters/about-filters.component';
import { OdourService } from 'src/app/services/odour.service';
import { OffcanvasService } from 'src/app/services/offcanvas.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Input() isOpen!: BehaviorSubject<boolean>;
  @Output() toggleFilters = new EventEmitter<void>();
  @Output() filterObservations = new EventEmitter();
  @Output() resetFilters = new EventEmitter();

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
  ) {}

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

  public toggleFilter(): void {
    this.isOpen.next(!this.isOpen.value);
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

  public resetDefaultFilters(): void {
    this.filtersFormInitialValues.type = [];
    this.resetFilters.emit();
    this.filtersForm.reset(this.filtersFormInitialValues);
  }

  public filterOdour(): void {
    const filters = {
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
    this.filterObservations.emit(filters);
    this.toggleFilters.emit();
  }

  public openAboutFiltersOffcanva(): void {
    this.offcanvasService.openAboutFiltersOffcanvas();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
