import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion-filters',
  templateUrl: './accordion-filter.component.html',
  styleUrls: ['./accordion-filter.component.scss'],
})
export class AccordionComponent {
  @Input() title!: string;
}
