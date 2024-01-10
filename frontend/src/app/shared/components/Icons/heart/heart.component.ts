import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-heart',
  template: `
    <div class="position-relative">
      <svg *ngIf="!liked; else likedIcon" xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" [ngClass]="iconClass">
        <mask id="mask0_3963_1839" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="19" height="18">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H18.8967V18H0V0Z" fill="white"/>
        </mask>
        <g mask="url(#mask0_3963_1839)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.68315 8.42058C2.97724 12.4468 8.0899 15.7024 9.4486 16.5082C10.8119 15.694 15.9615 12.4025 17.214 8.42427C18.0365 5.85271 17.2731 2.59534 14.24 1.61785C12.7706 1.14618 11.0565 1.43324 9.87319 2.34889C9.62582 2.53903 9.28245 2.54272 9.03323 2.35443C7.77976 1.41201 6.1423 1.13603 4.64977 1.61785C1.62131 2.59441 0.860729 5.85178 1.68315 8.42058ZM9.44994 18.0001C9.33548 18.0001 9.22195 17.9724 9.11857 17.9161C8.82966 17.7583 2.02416 14.0071 0.36548 8.84366C0.364557 8.84366 0.364557 8.84273 0.364557 8.84273C-0.676621 5.59182 0.482705 1.50649 4.22559 0.300094C5.98304 -0.268493 7.89832 -0.0183516 9.44717 0.959137C10.948 0.0102623 12.9418 -0.251878 14.6641 0.300094C18.4107 1.50834 19.5737 5.59275 18.5335 8.84273C16.9283 13.9471 10.073 17.7546 9.78223 17.9143C9.67885 17.9715 9.56439 18.0001 9.44994 18.0001Z"/>
        </g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.9104 7.03781C14.5532 7.03781 14.2504 6.76367 14.2209 6.40184C14.1599 5.64311 13.6523 5.00253 12.9295 4.769C12.565 4.65085 12.3656 4.26041 12.4828 3.89766C12.6019 3.53399 12.9886 3.33646 13.3541 3.45091C14.6122 3.85797 15.4937 4.97207 15.6017 6.28923C15.6322 6.67044 15.3488 7.00458 14.9676 7.03504C14.9482 7.03688 14.9298 7.03781 14.9104 7.03781Z"/>
      </svg>
      <ng-template #likedIcon>
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.44994 18.0001C9.33548 18.0001 9.22195 17.9724 9.11857 17.9161C8.82966 17.7583 2.02416 14.0071 0.36548 8.84366C0.364557 8.84366 0.364557 8.84273 0.364557 8.84273C-0.676621 5.59182 0.482705 1.50649 4.22559 0.300094C5.98304 -0.268493 7.89832 -0.0183516 9.44717 0.959137C10.948 0.0102623 12.9418 -0.251878 14.6641 0.300094C18.4107 1.50834 19.5737 5.59275 18.5335 8.84273C16.9283 13.9471 10.073 17.7546 9.78223 17.9143C9.67885 17.9715 9.56439 18.0001 9.44994 18.0001" fill="#D7B1F2"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M14.9104 7.03781C14.5532 7.03781 14.2504 6.76367 14.2209 6.40184C14.1599 5.64311 13.6523 5.00253 12.9295 4.769C12.565 4.65085 12.3656 4.26041 12.4828 3.89766C12.6019 3.53399 12.9886 3.33646 13.3541 3.45091C14.6122 3.85797 15.4937 4.97207 15.6017 6.28923C15.6322 6.67044 15.3488 7.00458 14.9676 7.03504C14.9482 7.03688 14.9298 7.03781 14.9104 7.03781" fill="white"/>
        </svg>
      </ng-template>
      
      <svg class="heartEffect" width="19" height="18" *ngFor="let heart of hearts" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.44994 18.0001C9.33548 18.0001 9.22195 17.9724 9.11857 17.9161C8.82966 17.7583 2.02416 14.0071 0.36548 8.84366C0.364557 8.84366 0.364557 8.84273 0.364557 8.84273C-0.676621 5.59182 0.482705 1.50649 4.22559 0.300094C5.98304 -0.268493 7.89832 -0.0183516 9.44717 0.959137C10.948 0.0102623 12.9418 -0.251878 14.6641 0.300094C18.4107 1.50834 19.5737 5.59275 18.5335 8.84273C16.9283 13.9471 10.073 17.7546 9.78223 17.9143C9.67885 17.9715 9.56439 18.0001 9.44994 18.0001" fill="#D7B1F2"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.9104 7.03781C14.5532 7.03781 14.2504 6.76367 14.2209 6.40184C14.1599 5.64311 13.6523 5.00253 12.9295 4.769C12.565 4.65085 12.3656 4.26041 12.4828 3.89766C12.6019 3.53399 12.9886 3.33646 13.3541 3.45091C14.6122 3.85797 15.4937 4.97207 15.6017 6.28923C15.6322 6.67044 15.3488 7.00458 14.9676 7.03504C14.9482 7.03688 14.9298 7.03781 14.9104 7.03781" fill="white"/>
      </svg>
    </div>
  `,
  styles: [
    `
      $heart-left-animation: 5px;
      .heartEffect {
        position: absolute;
        top: 12px;
        left: -$heart-left-animation;
        animation: heartEffect 1s ease-in-out;
        z-index: 1000;
        opacity: 0;
      }
      @keyframes heartEffect {
        0% {
          transform: scale(0);
          top: 12px;
          left: -$heart-left-animation;
          opacity: 1;
        }
        15% {
          left: 0;
          opacity: 1;
        }
        30% {
          transform: scale(2);
          left: -$heart-left-animation;
        }
        45% {
          left: $heart-left-animation;
        }
        60% {
          left: -$heart-left-animation;
        }
        75% {
          transform: scale(0);
          top: -150px;
          left: $heart-left-animation;
        }
        90% {
          top: -300px;
          left: -$heart-left-animation;
        }
        100% {
          left: 0;
          opacity: 0; 
        }
      }
    `
  ]
})
export class HeartComponent {
  @Input() iconClass = '';
  @Input() liked: boolean|undefined = undefined;
  public hearts: number[] = [];

  public heartsEffect() {
    for (let i = this.hearts.length; i < this.hearts.length + 5; i++) {

      setTimeout(() => this.hearts.push(i), 0 + 150 * i);      
      setTimeout(() => this.removeHearth(i), 1500 + 150 * i);

    }
    console.log(this.hearts);
  }

  removeHearth(heart: number) {
    // comprobamos si ya se borro el corazón
    if (!this.hearts.includes(heart)) return;    
    // borra corazón
    this.hearts = this.hearts.filter(x => x !== heart);
  }

}