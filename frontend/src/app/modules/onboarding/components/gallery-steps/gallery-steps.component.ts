import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-gallery-steps',
  templateUrl: './gallery-steps.component.html',
  styleUrls: ['./gallery-steps.component.scss'],
})
export class GalleryStepsComponent {
  public steps: undefined[] = [...Array(5)];
  public step: number | any = 1;

  constructor(private router: Router, private footerService: FooterService) {
    this.footerService.visible = false;

  }

  
  public goForward = async () => {
    const lastStep = this.step === 4;
    if (lastStep) this.router.navigate(['/register']);
    else this.step = ++this.step;
  };

  public moveTo = async (step: number) => {
    if (step > 4) this.router.navigate(['/register']);
    else this.step = step;
  };
}
