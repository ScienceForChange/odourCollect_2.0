import { Injectable, inject } from '@angular/core';
import {
  NgbActiveOffcanvas,
  NgbOffcanvas,
  NgbOffcanvasOptions,
} from '@ng-bootstrap/ng-bootstrap';
import { InfoObservationOffcanvaComponent } from '../modules/offcanvas/components/info-observation-offcanva/info-observation-offcanva.component';
import { ObservationFiltersOffCanvaComponent } from '../modules/offcanvas/components/observation-filters-offcanva/observation-filters-offcanva.component';
import { Observation } from '../models/observation';
import { MenuOffcanvaComponent } from '../modules/offcanvas/components/menu-offcanva/menu-offcanva.component';
import { AboutOdourCollectComponent } from '../modules/information/components/about-odour-collect/about-odour-collect.component';
import { AboutDataProtectionComponent } from '../modules/information/components/about-data-protection/about-data-protection.component';
import { AboutEthicalIssuesComponent } from '../modules/information/components/about-ethical-issues/about-ethical-issues.component';
import { AboutFiltersComponent } from '../modules/information/components/about-filters/about-filters.component';
import { AboutTrainedUserComponent } from '../modules/information/components/about-trained-user/about-trained-user.component';
import { AboutBadgesComponent } from '../modules/information/components/about-badges/about-badges.component';
import { AboutOdourSourceComponent } from '../modules/information/components/about-odour-source/about-odour-source.component';
import { AboutIntensityAndPleasentessComponent } from '../modules/information/components/about-intensity-and-pleasentess/about-intensity-and-pleasentess.component';
import { PublicProfileOffcanvaComponent } from '../modules/offcanvas/components/public-profile-offcanva/public-profile-offcanva.component';
import { CommentsOffcanvaComponent } from '../modules/offcanvas/components/comments-offcanva/comments-offcanva.component';
import { User } from '../models/user';
import { AboutStudyZoneComponent } from '../modules/information/components/about-study-zone/about-study-zone.component';

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
      InfoObservationOffcanvaComponent,
      bottomOffCanvasConfig,
    ).componentInstance.observation = observation;
  }

  public openMapFiltersOffCanvas(): void {
    this.offcanvasService.open(
      ObservationFiltersOffCanvaComponent,
      bottomOffCanvasConfig,
    );
  }

  public openMenuOffCanvas(): void {
    this.offcanvasService.open(MenuOffcanvaComponent, menuOffCanvasConfig);
  }

  //Profile

  public openProfileOffcanva(observation: Observation) {
    this.offcanvasService.open(
      PublicProfileOffcanvaComponent,
      profileOffCanvasConfig,
    ).componentInstance.user = observation.relationships.user;
  }

  //Comments

  public openCommentsOffcanvaComponent(
    user: User | undefined,
    observation: Observation,
    addCommnetary: boolean,
  ) {
    const offcanva = this.offcanvasService.open(CommentsOffcanvaComponent, {
      position: 'bottom',
      scroll: true,
      panelClass: 'default comments',
      backdropClass: 'default comments',
    });
    offcanva.componentInstance.user = user;
    offcanva.componentInstance.observation = observation;
    offcanva.componentInstance.addCommnetary = addCommnetary;
  }

  //About

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
