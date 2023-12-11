import { Component, OnInit } from '@angular/core';
import { OdourService } from 'src/app/services/odour.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AboutStudyZoneComponent } from '../about-study-zone/about-study-zone.component';

@Component({
  selector: 'app-more-info-about',
  templateUrl: './more-info-about.component.html',
  styleUrls: ['./more-info-about.component.scss'],
})
export class MoreInfoAboutComponent implements OnInit {
  public isOpen: boolean = false;
  public studyZone!: any;

  constructor(
    private odourService: OdourService,
    private offcanvasService: NgbOffcanvas,
  ) {}

  ngOnInit(): void {
    this.odourService.studyZone.subscribe((studyZone) => {
      if (studyZone) {
        this.studyZone = studyZone.features[0].properties;
      }
    });
  }

  public openModalAbout(): void {
    this.offcanvasService.open(AboutStudyZoneComponent, {
      position: 'start',
      scroll: false,
      panelClass: 'about-canvas',
    });
  }

  public openModal(): void {
    this.isOpen = true;
  }
  public closeModal(): void {
    this.isOpen = false;
  }
}
