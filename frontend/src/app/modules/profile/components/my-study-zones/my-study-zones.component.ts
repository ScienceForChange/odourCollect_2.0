import { Component } from '@angular/core';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-my-study-zones',
  templateUrl: './my-study-zones.component.html',
  styleUrls: ['./my-study-zones.component.scss'],
})
export class MyStudyZonesComponent {
  constructor(private footerService: FooterService) {
    this.footerService.visible = true;

  }
}
