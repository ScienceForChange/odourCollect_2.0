import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-odour-type-icon',
  templateUrl: './odour-type-icon.component.html',
  styleUrls: ['./odour-type-icon.component.scss']
})
export class OdourTypeIconComponent {
  @Input() odourType!:string;
  @Input() odourName!:string
  @Input() odourSubtypeName: string | null = null;
  @Input() iconClass!:string;  
}
