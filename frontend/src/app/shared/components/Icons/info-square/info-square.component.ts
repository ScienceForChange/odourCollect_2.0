import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'icon-info-square',
  template: `
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      [ngClass]="iconClass"
    >
      <mask
        id="mask0_2439_9610"
        style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.5 0.5H15.4999V15.5H0.5V0.5Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_2439_9610)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.748 1.625C2.85125 1.625 1.625 2.92475 1.625 4.937V11.063C1.625 13.0752 2.85125 14.375 4.748 14.375H11.249C13.148 14.375 14.375 13.0752 14.375 11.063V4.937C14.375 2.92475 13.148 1.625 11.2505 1.625H4.748ZM11.249 15.5H4.748C2.207 15.5 0.5 13.7165 0.5 11.063V4.937C0.5 2.2835 2.207 0.5 4.748 0.5H11.2505C13.7922 0.5 15.5 2.2835 15.5 4.937V11.063C15.5 13.7165 13.7922 15.5 11.249 15.5Z"
          fill="#7D7E7C"
        />
      </g>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.99609 11.5625C7.68559 11.5625 7.43359 11.3105 7.43359 11V8C7.43359 7.6895 7.68559 7.4375 7.99609 7.4375C8.30659 7.4375 8.55859 7.6895 8.55859 8V11C8.55859 11.3105 8.30659 11.5625 7.99609 11.5625Z"
        fill="#7D7E7C"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.99984 5.90283C7.58509 5.90283 7.24609 5.56758 7.24609 5.15283C7.24609 4.73808 7.57834 4.40283 7.99234 4.40283H7.99984C8.41459 4.40283 8.74984 4.73808 8.74984 5.15283C8.74984 5.56758 8.41459 5.90283 7.99984 5.90283Z"
        fill="#7D7E7C"
      />
    </svg>
  `,
  styleUrls: [],
})
export class InfoSquareComponent {
  @Input() iconClass =''
}
