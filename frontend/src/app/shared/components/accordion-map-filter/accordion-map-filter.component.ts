import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-accordion-map-filters',
  templateUrl: './accordion-map-filter.component.html',
  styleUrls: ['./accordion-map-filter.component.scss'],
})
export class AccordionMapFilterComponent implements OnInit {
  @Input() title!: string;
  @Input() fControls!: (AbstractControl<any, any> | null)[]; 
  public isChecked!: boolean;

  ngOnInit(): void {
    this.fControls?.forEach((fcontrol) => {
      fcontrol?.statusChanges.subscribe(()=> {
        this.isChecked = fcontrol.valid
      })
    });

    this.fControls?.forEach((fcontrol) => {
      fcontrol?.setErrors({ incorrect: true });
    });
    this.isChecked = false;
  }

  public toggleTouch(): void {
    this.fControls.forEach((fcontrol) => {
      if (!fcontrol?.valid) {
        this.isChecked = true;
        fcontrol?.setErrors(null);
      } else {
        this.isChecked = false;
        fcontrol?.setErrors({ incorrect: true });
      }
    });
  }
}
