import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-happy-face',
  template: `
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      [ngClass]="iconClass"
    >
      <g clip-path="url(#clip0_1789_10296)">
        <path
          d="M8.45 8.66C8.45 9.36 7.88 9.92 7.19 9.92C6.5 9.92 5.93 9.35 5.93 8.66C5.93 7.97 6.5 7.4 7.19 7.4C7.88 7.4 8.45 7.97 8.45 8.66Z"
          fill="#D7B1F2"
        />
        <path
          d="M15.62 8.66C15.62 9.36 15.05 9.92 14.36 9.92C13.67 9.92 13.1 9.35 13.1 8.66C13.1 7.97 13.67 7.4 14.36 7.4C15.05 7.4 15.62 7.97 15.62 8.66Z"
          fill="#D7B1F2"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.8 1.5C5.66421 1.5 1.5 5.66421 1.5 10.8C1.5 15.9358 5.66421 20.1 10.8 20.1C15.9358 20.1 20.1 15.9358 20.1 10.8C20.1 5.66421 15.9358 1.5 10.8 1.5ZM0 10.8C0 4.83579 4.83579 0 10.8 0C16.7642 0 21.6 4.83579 21.6 10.8C21.6 16.7642 16.7642 21.6 10.8 21.6C4.83579 21.6 0 16.7642 0 10.8ZM7.46221 13.4411L7.19 14.14C7.46286 13.4414 7.46221 13.4411 7.46221 13.4411L7.46585 13.4425L7.48898 13.4511C7.51096 13.4591 7.54587 13.4716 7.59283 13.4876C7.68679 13.5194 7.82865 13.5649 8.01127 13.6161C8.37716 13.7185 8.90304 13.8425 9.53263 13.9251C10.799 14.0914 12.4408 14.0848 14.0411 13.4438C14.4256 13.2898 14.8622 13.4766 15.0162 13.8611C15.1702 14.2456 14.9834 14.6822 14.5989 14.8362C12.6792 15.6052 10.756 15.5986 9.33737 15.4124C8.62446 15.3188 8.02783 15.1784 7.60685 15.0605C7.39604 15.0015 7.22837 14.9479 7.11116 14.9081C7.05253 14.8882 7.00645 14.8718 6.97382 14.8599L6.93507 14.8455L6.92346 14.8411L6.91963 14.8396L6.91822 14.839C6.91822 14.839 6.91714 14.8386 7.19 14.14L6.91714 14.8386C6.53131 14.6879 6.3407 14.253 6.4914 13.8671C6.64199 13.4816 7.07658 13.291 7.46221 13.4411Z"
          fill="#D7B1F2"
        />
      </g>
      <defs>
        <clipPath id="clip0_1789_10296">
          <rect width="21.6" height="21.6" fill="white" />
        </clipPath>
      </defs>
    </svg>
  `,
  styleUrls: [],
})
export class HappyFaceComponent {
  @Input() iconClass = '';
}