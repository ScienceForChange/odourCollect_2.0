import { Injectable } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasOptions } from '@ng-bootstrap/ng-bootstrap';
import { InfoObservationOffcanvasComponent } from '../modules/offcanvas/components/info-observation-offcanvas/info-observation-offcanvas.component';
import { ObservationFiltersOffCanvasComponent } from '../modules/offcanvas/components/observation-filters-offcanvas/observation-filters-offcanvas.component';
import { Observation } from '../models/observation';
import { MenuOffcanvasComponent } from '../modules/offcanvas/components/menu-offcanvas/menu-offcanvas.component';
import { AboutOdourCollectComponent } from '../modules/information/components/about-odour-collect/about-odour-collect.component';
import { AboutDataProtectionComponent } from '../modules/information/components/about-data-protection/about-data-protection.component';
import { AboutEthicalIssuesComponent } from '../modules/information/components/about-ethical-issues/about-ethical-issues.component';
import { AboutFiltersComponent } from '../modules/information/components/about-filters/about-filters.component';
import { AboutTrainedUserComponent } from '../modules/information/components/about-trained-user/about-trained-user.component';
import { AboutBadgesComponent } from '../modules/information/components/about-badges/about-badges.component';
import { AboutOdourSourceComponent } from '../modules/information/components/about-odour-source/about-odour-source.component';
import { AboutIntensityAndPleasentessComponent } from '../modules/information/components/about-intensity-and-pleasentess/about-intensity-and-pleasentess.component';
import { PublicProfileOffcanvasComponent } from '../modules/offcanvas/components/public-profile-offcanvas/public-profile-offcanvas.component';
import { CommentsOffcanvasComponent } from '../modules/offcanvas/components/comments-offcanvas/comments-offcanvas.component';
import { User } from '../models/user';
import { AboutStudyZoneComponent } from '../modules/information/components/about-study-zone/about-study-zone.component';
import { FiltersMyOdoursOffcanvasComponent } from '../modules/offcanvas/components/filters-my-odours-offcanvas/filters-my-odours-offcanvas.component';
import { BehaviorSubject } from 'rxjs';
import { FaqsComponent } from '../modules/faqs/components/faqs/faqs.component';
import { LegendOffcanvasComponent } from '../modules/offcanvas/components/legend-offcanvas/legend-offcanvas.component';

const bottomOffCanvasConfig: NgbOffcanvasOptions = {
  position: 'bottom',
  scroll: true,
  panelClass: 'default info-observation',
  backdrop: true,
  backdropClass: 'default info-observation',
};
const profileOffCanvasConfig: NgbOffcanvasOptions = {
  position: 'bottom',
  scroll: true,
  panelClass: 'default public-profile',
  backdropClass: 'default public-profile',
};

const menuOffCanvasConfig: NgbOffcanvasOptions = {
  backdrop: true,
  backdropClass: 'default info-observation',
};

const aboutOffCanvasConfig: NgbOffcanvasOptions = {
  position: 'start',
  scroll: false,
  panelClass: 'about-canvas',
};

@Injectable({
  providedIn: 'root',
})
export class OffcanvasService {
  constructor(private offcanvasService: NgbOffcanvas) {}

  //Map
  public openOdourInformationOffCanvas(observation: Observation): void {
    this.offcanvasService.open(
      InfoObservationOffcanvasComponent,
      bottomOffCanvasConfig,
    ).componentInstance.observation = observation;
  }

  public openMapFiltersOffCanvas(): void {
    this.offcanvasService.open(
      ObservationFiltersOffCanvasComponent,
      bottomOffCanvasConfig,
    );
  }

  public openMenuOffCanvas(): void {
    this.offcanvasService.open(MenuOffcanvasComponent, menuOffCanvasConfig);
  }

  public openLegendOffCanvas(): void {
    this.offcanvasService.open(LegendOffcanvasComponent, aboutOffCanvasConfig);
  }

  //Profile
  public openProfileOffcanvas(observation: Observation) {
    this.offcanvasService.open(
      PublicProfileOffcanvasComponent,
      profileOffCanvasConfig,
    ).componentInstance.user = observation.relationships.user;
  }

  //Comments
  public openCommentsOffcanvasComponent(
    user: User | undefined,
    observation: Observation,
    addCommnetary: boolean,
  ) {
    const offcanva = this.offcanvasService.open(CommentsOffcanvasComponent, {
      position: 'bottom',
      scroll: true,
      panelClass: 'default comments',
      backdropClass: 'default comments',
    });
    offcanva.componentInstance.user = user;
    offcanva.componentInstance.observation = observation;
    offcanva.componentInstance.addCommnetary = addCommnetary;
  }

  //MyOdours Filter
  public openMyOdoursFiltersOffCanvas(
    observationRef: Observation[] | undefined,
    observations$: BehaviorSubject<Observation[] | undefined>,
  ): void {
    const offCanvas = this.offcanvasService.open(
      FiltersMyOdoursOffcanvasComponent,
      bottomOffCanvasConfig,
    );
    offCanvas.componentInstance.observationsRef = observationRef;
    offCanvas.componentInstance.observations$ = observations$;
  }

  //About

  public openFaqsOffcanvas(): void {
    this.offcanvasService.open(FaqsComponent, aboutOffCanvasConfig);
  }

  public openAboutOCOffcanvas(): void {
    this.offcanvasService.open(
      AboutOdourCollectComponent,
      aboutOffCanvasConfig,
    );
  }

  public openAboutDataProtectionOffcanvas(): void {
    this.offcanvasService.open(
      AboutDataProtectionComponent,
      aboutOffCanvasConfig,
    );
  }

  public openAboutEthicalIssuesOffcanvas(): void {
    this.offcanvasService.open(
      AboutEthicalIssuesComponent,
      aboutOffCanvasConfig,
    );
  }

  public openAboutFiltersOffcanvas(): void {
    this.offcanvasService.open(AboutFiltersComponent, aboutOffCanvasConfig);
  }

  public openAboutTrainedOffcanvas() {
    this.offcanvasService.open(AboutTrainedUserComponent, aboutOffCanvasConfig);
  }

  public openAboutBadgesOffcanvas() {
    this.offcanvasService.open(AboutBadgesComponent, aboutOffCanvasConfig);
  }

  public openAboutOdourSourceComponentOffCanvas() {
    this.offcanvasService.open(AboutOdourSourceComponent, aboutOffCanvasConfig);
  }

  public openAboutIntensityAndPleasentessComponentOffCanvas() {
    this.offcanvasService.open(
      AboutIntensityAndPleasentessComponent,
      aboutOffCanvasConfig,
    );
  }

  public openAboutStudyZoneComponentOffCanvas() {
    this.offcanvasService.open(AboutStudyZoneComponent, aboutOffCanvasConfig);
  }
}
