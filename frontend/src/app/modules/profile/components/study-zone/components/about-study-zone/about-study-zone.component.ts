import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { OdourService } from '../../../../../../services/odour.service';

@Component({
  selector: 'app-about-study-zone',
  templateUrl: './about-study-zone.component.html',
  styleUrls: ['./about-study-zone.component.scss'],
})
export class AboutStudyZoneComponent implements OnInit {
  @Input() public studyZone!: any;

  constructor(
    public offcanvas: NgbActiveOffcanvas,
    private odourService: OdourService,
  ) {}

  ngOnInit(): void {
    this.odourService.studyZone.subscribe((studyZone) => {
      if (studyZone) {
        this.studyZone = studyZone.features[0].properties;
      }
    });
  }
}
