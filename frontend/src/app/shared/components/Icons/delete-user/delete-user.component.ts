import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-delete-user',
  template: `
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      [ngClass]="iconClass"
    >
      <mask
        id="mask0_1801_12278"
        style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="4"
        y="14"
        width="16"
        height="8"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4 14.4961H19.8399V21.8701H4V14.4961Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_1801_12278)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.921 15.9961C7.66 15.9961 5.5 16.7281 5.5 18.1731C5.5 19.6311 7.66 20.3701 11.921 20.3701C16.181 20.3701 18.34 19.6381 18.34 18.1931C18.34 16.7351 16.181 15.9961 11.921 15.9961ZM11.921 21.8701C9.962 21.8701 4 21.8701 4 18.1731C4 14.8771 8.521 14.4961 11.921 14.4961C13.88 14.4961 19.84 14.4961 19.84 18.1931C19.84 21.4891 15.32 21.8701 11.921 21.8701Z"
          fill="#D7B1F2"
        />
      </g>
      <mask
        id="mask1_1801_12278"
        style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="6"
        y="2"
        width="12"
        height="11"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.60938 2H17.2294V12.6186H6.60938V2Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1_1801_12278)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.9204 3.42751C9.77941 3.42751 8.03741 5.16851 8.03741 7.30951C8.03041 9.44351 9.75941 11.1835 11.8914 11.1915L11.9204 11.9055V11.1915C14.0604 11.1915 15.8014 9.44951 15.8014 7.30951C15.8014 5.16851 14.0604 3.42751 11.9204 3.42751ZM11.9204 12.6185H11.8884C8.96641 12.6095 6.59941 10.2265 6.60941 7.30651C6.60941 4.38151 8.99141 1.99951 11.9204 1.99951C14.8484 1.99951 17.2294 4.38151 17.2294 7.30951C17.2294 10.2375 14.8484 12.6185 11.9204 12.6185Z"
          fill="#D7B1F2"
        />
      </g>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.5412 10.5644C24.3005 10.803 23.9116 10.8012 23.673 10.5605L19.4516 6.30033C19.2131 6.05962 19.2149 5.67067 19.4556 5.43215C19.6963 5.19363 20.0853 5.1954 20.3238 5.43612L24.5452 9.69627C24.7837 9.93698 24.7819 10.3259 24.5412 10.5644Z"
        fill="#D7B1F2"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.5639 6.32114L20.3003 10.546C20.059 10.7851 19.6706 10.7827 19.4321 10.542C19.1936 10.3013 19.1948 9.91295 19.4361 9.67385L23.6997 5.44899C23.9404 5.21047 24.3294 5.21224 24.5679 5.45296C24.8064 5.69367 24.8046 6.08261 24.5639 6.32114Z"
        fill="#D7B1F2"
      />
    </svg>
  `,
  styleUrls: [],
})
export class DeleteUserComponent {
  @Input() iconClass = '';
}
