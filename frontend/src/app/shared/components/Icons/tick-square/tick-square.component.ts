import { Component, Input } from '@angular/core';

@Component({
  selector: 'tick-info-square',
  template: `
  <svg width="20" height="20" viewBox="0 0 20 20" [ngClass]="iconClass" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.665 1.5C3.135 1.5 1.5 3.233 1.5 5.916V14.084C1.5 16.767 3.135 18.5 5.665 18.5H14.333C16.864 18.5 18.5 16.767 18.5 14.084V5.916C18.5 3.233 16.864 1.5 14.334 1.5H5.665ZM14.333 20H5.665C2.276 20 0 17.622 0 14.084V5.916C0 2.378 2.276 0 5.665 0H14.334C17.723 0 20 2.378 20 5.916V14.084C20 17.622 17.723 20 14.333 20Z" fill="black"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.81345 13.123C8.62245 13.123 8.42945 13.05 8.28345 12.903L5.90945 10.53C5.61645 10.237 5.61645 9.763 5.90945 9.47C6.20245 9.177 6.67645 9.177 6.96945 9.47L8.81345 11.312L13.0294 7.097C13.3224 6.804 13.7964 6.804 14.0894 7.097C14.3824 7.39 14.3824 7.864 14.0894 8.157L9.34345 12.903C9.19745 13.05 9.00545 13.123 8.81345 13.123Z" fill="black"/>
  </svg>
  `,
  styleUrls: [],
})
export class TickSquareComponent {
  @Input() iconClass =''
}
