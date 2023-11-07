import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  OdourHedonicTone,
  OdourIntensity,
  OdourTypeData,
} from 'src/app/models/odour-related-data';
import { OdourService } from 'src/app/services/odour.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Input() isOpen!: boolean;
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
  private filtersFormInitialValues: {
    type: [];
    intensity: number;
    hedonicTone: number;
  } = { type: [], intensity: 0, hedonicTone: 0 };

  private subscriptions = new Subscription();

  constructor(private odourService: OdourService) {}

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
          intensity: new FormControl(0, [Validators.required]),
          hedonicTone: new FormControl(0, [Validators.required]),
        });

        this.subscriptions.add(
          this.filtersForm.valueChanges.subscribe(() => {
            this.formChanges = true;
          }),
        );
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

  public resetDefaultFilters(): void {
    this.resetFilters.emit();
    this.filtersForm.reset(this.filtersFormInitialValues);
    this.toggleFilters.emit();
  }

  public filterOdour(): void {

    const filters = {
      type: this.filtersForm.value.type,
      intensity: this.intensity[this.filtersForm.value.intensity].id,
      hedonicTone: this.hedonicTone[this.filtersForm.value.hedonicTone].id,
    };
    this.filterObservations.emit(filters);
    this.toggleFilters.emit();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
