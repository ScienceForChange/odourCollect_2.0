import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-arrow-right2',
  template: `
    <svg
      width="10"
      height="16"
      viewBox="0 0 10 16"
      fill="none"
      [ngClass]="iconClass"
    >
      <path
        d="M0.96967 15.5303C0.703403 15.2641 0.679197 14.8474 0.897052 14.5538L0.96967 14.4697L7.439 8L0.96967 1.53033C0.703403 1.26406 0.679197 0.8474 0.897052 0.553788L0.96967 0.46967C1.23594 0.203403 1.6526 0.179197 1.94621 0.397052L2.03033 0.46967L9.03033 7.46967C9.2966 7.73594 9.3208 8.1526 9.10295 8.44621L9.03033 8.53033L2.03033 15.5303C1.73744 15.8232 1.26256 15.8232 0.96967 15.5303Z"
        fill="#D7B1F2"
      />
    </svg>
  `,
  styleUrls: [],
})
export class ArrowRight2Component {
  @Input() iconClass = '';
}
