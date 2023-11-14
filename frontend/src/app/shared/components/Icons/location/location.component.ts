import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-location',
  template: `
    <svg
      width="50"
      height="59"
      viewBox="0 0 50 59"
      fill="none"
      [ngClass]="iconClass"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.9628 19.6665C22.0431 19.6665 19.668 22.0416 19.668 24.9644C19.668 27.8842 22.0431 30.2563 24.9628 30.2563C27.8826 30.2563 30.2577 27.8842 30.2577 24.9644C30.2577 22.0416 27.8826 19.6665 24.9628 19.6665ZM24.9627 34.7951C19.5408 34.7951 15.1294 30.3867 15.1294 24.9648C15.1294 19.5398 19.5408 15.1284 24.9627 15.1284C30.3847 15.1284 34.7961 19.5398 34.7961 24.9648C34.7961 30.3867 30.3847 34.7951 24.9627 34.7951Z"
        fill="#D7B1F2"
      />
      <mask
        id="mask0_1722_10386"
        style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="50"
        height="59"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 0H49.9216V59H0V0Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_1722_10386)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24.9596 4.53886C13.6982 4.53886 4.53653 13.7882 4.53653 25.1526C4.53653 39.6121 21.5527 53.6995 24.9596 54.4498C28.3665 53.6965 45.3827 39.6091 45.3827 25.1526C45.3827 13.7882 36.221 4.53886 24.9596 4.53886ZM24.9591 59C19.5311 59 -0.00244141 42.2016 -0.00244141 25.1522C-0.00244141 11.2826 11.1955 0 24.9591 0C38.7227 0 49.9206 11.2826 49.9206 25.1522C49.9206 42.2016 30.3871 59 24.9591 59Z"
          fill="#D7B1F2"
        />
      </g>
    </svg>
  `,
  styleUrls: [],
})
export class LocationComponent {
  @Input() iconClass = '';
}
