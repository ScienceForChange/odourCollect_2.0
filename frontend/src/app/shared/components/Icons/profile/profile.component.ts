import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-profile',
  template: `
    <svg
      width="29"
      height="31"
      viewBox="0 0 29 31"
      fill="none"
      [ngClass]="iconClass"
    >
      <path
        d="M27.6667 30C27.6667 27.6741 27.6667 26.5111 27.3796 25.5648C26.7333 23.4341 25.0659 21.7667 22.9352 21.1204C21.9889 20.8333 20.8259 20.8333 18.5 20.8333H10.1667C7.84073 20.8333 6.67776 20.8333 5.73143 21.1204C3.60076 21.7667 1.9334 23.4341 1.28707 25.5648C1 26.5111 1 27.6741 1 30M21.8333 9.5C21.8333 13.6421 18.4755 17 14.3333 17C10.1912 17 6.83333 13.6421 6.83333 9.5C6.83333 5.35786 10.1912 2 14.3333 2C18.4755 2 21.8333 5.35786 21.8333 9.5Z"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  styleUrls: [],
})
export class ProfileComponent {
  
  @Input() iconClass = ''
}
