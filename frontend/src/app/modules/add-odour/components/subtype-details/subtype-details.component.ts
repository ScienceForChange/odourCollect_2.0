import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import {
  OdourHedonicTone,
  OdourIntensity,
  OdourSubType,
  OdourTypeData,
} from 'src/app/models/odour-related-data';
import { AboutIntensityAndPleasentessComponent } from 'src/app/modules/information/components/about-intensity-and-pleasentess/about-intensity-and-pleasentess.component';

@Component({
  selector: 'app-subtype-details',
  templateUrl: './subtype-details.component.html',
  styleUrls: ['./subtype-details.component.scss'],
})
export class SubtypeDetailsComponent implements OnInit {
  @Input() public subtypeDetails!: FormGroup;
  @Input() public subtypes: OdourSubType[] = [];
  @Input() public selectedType!: OdourTypeData;
  @Input() public intensity: OdourIntensity[] = [];
  @Input() public hedonicTone: OdourHedonicTone[] = [];

  public hedonicToneForRange: string[] = [];
  public intensityForRange: string[] = [];
  
  constructor(private offcanvasService: NgbOffcanvas) {}

  ngOnInit() {
    this.intensityForRange = this.intensity.map((segment) => segment.name);
    this.hedonicToneForRange = this.hedonicTone.map((segment) => segment.name);
  }
  
  openInfoOffcanvas(){
    this.offcanvasService.open(AboutIntensityAndPleasentessComponent, {  position: 'start', scroll: false, panelClass: 'about-canvas' });
  }
}
