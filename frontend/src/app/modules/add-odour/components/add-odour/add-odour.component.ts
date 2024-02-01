import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import {
  OdourHedonicTone,
  OdourIntensity,
  OdourCreateForm,
  OdourSubType,
  OdourTypeData,
} from 'src/app/models/odour-related-data';
import { InfoModalComponent } from 'src/app/modules/modals/info-modal/info-modal.component';

import { OdourService } from 'src/app/services/odour.service';
import { MapService } from '../../../../services/map.service';
import { UserService } from 'src/app/services/user.service';
import { ObservationRes } from 'src/app/models/observation';
import { TickSquareComponent } from 'src/app/shared/components/Icons/tick-square/tick-square.component';
import { AlertService } from '../../../../services/alert.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { OffcanvasService } from '../../../../services/offcanvas.service';

@Component({
  selector: 'app-add-odour',
  templateUrl: './add-odour.component.html',
  styleUrls: ['./add-odour.component.scss'],
})
export class AddOdourComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  public dataLoaded: boolean = false;
  public activeStep: number = 0;
  public selectedType!: OdourTypeData;
  public selectedSubtype: OdourSubType | undefined;
  public types: OdourTypeData[] = [];
  public subtypes: OdourSubType[] = [];
  public hedonicTone: OdourHedonicTone[] = [];
  public intensity: OdourIntensity[] = [];
  public geoLocation: { lat: string; lng: string } = {
    lat: '',
    lng: '',
  };
  private params!: any;
  private subscriptions = new Subscription();
  public addOdourForm!: FormGroup;

  private subtypeValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value === 0) {
      return { required: true };
    }
    return null;
  }

  constructor(
    private odourService: OdourService,
    private modalService: NgbModal,
    private router: Router,
    private mapService: MapService,
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private OffcanvasService: OffcanvasService,
  ) {
    this.navigationService.footerVisible = false;
    const queryParams = this.route.snapshot.queryParams;
    this.params = queryParams;
    if (this.params.type && this.params.subtype) {
      this.activeStep = 1;
    }
  }

  ngOnInit(): void {
    this.navigationService.mapHeader = false;
    this.navigationService.defaultHeader = false;

    this.subscriptions.add(
      this.odourService.observationRelatedData().subscribe(({ data }) => {
        const filterObservationsSlugs = [
          'waste-water',
          'urban',
          'agriculture-livestock',
          'food-industries',
          'industrial',
        ];

        const filteredObservations = data.OdourType.filter((observation) =>
          filterObservationsSlugs.some((slug) => observation.slug === slug),
        );

        this.types = filteredObservations;
        this.hedonicTone = data.OdourHedonicTone;
        this.intensity = data.OdourIntensity;

        if (this.params.type && this.params.subtype) {
          this.subtypes = filteredObservations.filter(
            (odorType) => odorType.id === Number(this.params.type),
          )[0].relationships.odourSubTypes;
        }
        this.selectedType = this.types.filter(
          (odorType) =>
            odorType.id === this.addOdourForm.value.typeDetails.type,
        )[0];
        this.dataLoaded = true;
      }),
    );

    this.getLocation();

    this.addOdourForm = new FormGroup({
      typeDetails: new FormGroup({
        type: new FormControl(0, [Validators.required, Validators.min(1)]),
      }),
      subtypeDetails: new FormGroup({
        subtype: new FormControl(0, [
          Validators.required,
          this.subtypeValidator,
        ]),
        intensity: new FormControl(0, [Validators.required]),
        hedonic_tone: new FormControl(0, [Validators.required]),
      }),
      commentDetails: new FormGroup({
        know_about_source: new FormControl('', [Validators.required]),
        origin: new FormControl(null, [
          Validators.minLength(2),
          Validators.maxLength(255),
        ]),
        description: new FormControl(null, [
          Validators.minLength(5),
          Validators.maxLength(1500),
        ]),
      }),
    });

    if (this.params.type && this.params.subtype) {
      this.addOdourForm.patchValue({
        typeDetails: {
          type: Number(this.params.type),
        },
        subtypeDetails: {
          subtype: Number(this.params.subtype),
        },
      });
    }

    this.subscriptions.add(
      this.addOdourForm.valueChanges.subscribe((value) => {
        this.goToStep1(value);
      }),
    );
  }

  private getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.geoLocation = {
          lat: position.coords.latitude + '',
          lng: position.coords.longitude + '',
        };
      });
    }
  }

  private goToStep1(value: any): void {
    const doneStep1 = value.typeDetails.type > 0 && this.activeStep === 0;
    if (doneStep1) {
      const subtypeFilteredByType = this.types.filter(
        (odorType) => odorType.id === this.addOdourForm.value.typeDetails.type,
      )[0].relationships.odourSubTypes;

      this.selectedType = this.types.filter(
        (odorType) => odorType.id === this.addOdourForm.value.typeDetails.type,
      )[0];

      this.activeStep = 1;
      this.subtypes = subtypeFilteredByType;
    }
  }

  public goStepBack(): void {
    if (this.activeStep === 1)
      this.addOdourForm.get('subtypeDetails')?.reset({
        subtype: 0,
        intensity: 0,
        hedonic_tone: 0,
      });
    if (this.activeStep === 2)
      this.addOdourForm.get('commentDetails')?.reset({
        know_about_source: '',
        origin: null,
        description: null,
      });
    if (this.activeStep > 0) this.activeStep--;
  }

  public next(): void {
    if (this.currentGroup.valid) {
      this.activeStep += 1;
      const selectedSubtype = this.subtypes.find(
        (subtype) =>
          subtype.id === this.addOdourForm.get('subtypeDetails.subtype')?.value,
      );
      if(selectedSubtype !== undefined){
        this.selectedSubtype = selectedSubtype
      }
      return;
    }

    this.currentGroup.markAllAsTouched();
  }

  public get currentGroup(): FormGroup {
    return this.getGroupAt(this.activeStep);
  }

  private getGroupAt(index: number): FormGroup {
    const groups = Object.keys(this.addOdourForm.controls).map((groupName) =>
      this.addOdourForm.get(groupName),
    ) as FormGroup[];

    return groups[index];
  }

  public addNewOdor(): void {
    this.loading = true;

    const newOdour: OdourCreateForm = {
      odour_sub_type_id: this.addOdourForm.value.subtypeDetails.subtype,
      odour_intensity_id:
        this.intensity[this.addOdourForm.value.subtypeDetails.intensity].id,
      odour_hedonic_tone_id:
        this.hedonicTone[this.addOdourForm.value.subtypeDetails.hedonic_tone]
          .id,
      latitude: this.geoLocation.lat,
      longitude: this.geoLocation.lng,
      description: this.addOdourForm.value.commentDetails.description,
      origin: this.addOdourForm.value.commentDetails.origin,
    };

    this.odourService.createNewOdour(newOdour).subscribe({
      next: (observation: ObservationRes) => {
        this.loading = false;
        this.modalService.open(InfoModalComponent, {
          windowClass: 'default',
          backdropClass: 'default',
          centered: true,
          size: 'sm',
        }).componentInstance.config = {
          icon: TickSquareComponent,
          text: '¡El olor ha sido añadido!',
          acceptButtonText: 'Aceptar',
        };
        this.userService.addObservation(observation.data[0]);
        this.OffcanvasService.openOdourInformationOffCanvas(
          observation.data[0],
        );
        this.router.navigate(['/map']);
        this.mapService.centerMap(
          Number(observation.data[0].latitude),
          Number(observation.data[0].longitude),
        );
      },
      error: () => {
        this.loading = false;
        this.alertService.error(
          'No se ha podido crear la observación, prueba lo mas tarde.',
        );
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
