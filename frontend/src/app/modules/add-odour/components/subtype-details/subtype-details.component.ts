import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  OdourHedonicTone,
  OdourIntensity,
  OdourSubType,
  OdourTypeData,
} from 'src/app/models/odour-related-data';

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

  ngOnInit() {
    this.intensityForRange = this.intensity.map((segment) => segment.name);
    this.hedonicToneForRange = this.hedonicTone.map((segment) => segment.name);
  }
}
