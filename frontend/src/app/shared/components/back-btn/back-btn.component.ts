import { Component, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-btn',
  templateUrl: './back-btn.component.html',
  styleUrls: ['./back-btn.component.scss'],
})
export class BackBtnComponent {
  @Input() backTo!: () => void;
  @Input() route: string | null = null;

  constructor(
    private location: Location,
    private router: Router,
  ) {}

  goBack() {
    if (this.backTo) {
      this.backTo();
      return;
    }
    if (this.route) this.router.navigate([this.route]);
    else this.location.back();
  }
}
