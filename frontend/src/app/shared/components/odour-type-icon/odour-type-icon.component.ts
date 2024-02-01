import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-odour-type-icon',
  templateUrl: './odour-type-icon.component.html',
  styleUrls: ['./odour-type-icon.component.scss']
})
export class OdourTypeIconComponent implements OnInit{
  @Input() odourType!:string;
  @Input() odourName!:string
  @Input() odourSubtypeName: string | undefined = undefined;
  @Input() iconClass!:string;  

  ngOnInit(): void {
    console.log('odourSubtypeName', this.odourSubtypeName)
  }
}
