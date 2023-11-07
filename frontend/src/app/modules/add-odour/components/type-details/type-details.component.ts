import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OdourTypeData } from 'src/app/models/odour-related-data';

@Component({
  selector: 'app-type-details',
  templateUrl: './type-details.component.html',
  styleUrls: ['./type-details.component.scss'],
})
export class TypeDetailsComponent {
  @Input() public typeDetails!: FormGroup;
  @Input() public types: OdourTypeData[] = [];
}
