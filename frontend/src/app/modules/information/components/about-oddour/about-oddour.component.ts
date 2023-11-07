import { Component } from '@angular/core';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-about-oddour',
  templateUrl: './about-oddour.component.html',
  styleUrls: ['./about-oddour.component.scss'],
})
export class AboutOddourComponent {
  constructor(
    private footerService: FooterService
  ) {
    this.footerService.visible = false;
  }
}
