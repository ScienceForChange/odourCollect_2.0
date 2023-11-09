import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-filter',
  template: `
    <svg width="14" height="15" [ngClass]="iconClass" viewBox="0 0 14 15" fill="none">
      <path
        d="M1 7.41631L9 7.41631M9 7.41631C9 8.52562 9.89543 9.42489 11 9.42489C12.1046 9.42489 13 8.52562 13 7.41631C13 6.307 12.1046 5.40772 11 5.40772C9.89543 5.40772 9 6.307 9 7.41631ZM5 11.9914L13 11.9914M5 11.9914C5 13.1007 4.10457 14 3 14C1.89543 14 1 13.1007 1 11.9914C1 10.8821 1.89543 9.98283 3 9.98283C4.10457 9.98283 5 10.8821 5 11.9914ZM5 3.00858L13 3.00858M5 3.00858C5 4.11789 4.10457 5.01717 3 5.01717C1.89543 5.01717 1 4.11789 1 3.00858C1 1.89927 1.89543 1 3 1C4.10457 1 5 1.89927 5 3.00858Z"
        stroke="#191A19"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  styleUrls: [],
})
export class FilterComponent {
  @Input() iconClass =''
}
