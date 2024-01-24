import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-gallery-steps',
  templateUrl: './gallery-steps.component.html',
  styleUrls: ['./gallery-steps.component.scss'],
})
export class GalleryStepsComponent implements OnInit {
  public steps: undefined[] = [...Array(5)];
  public step: number | any = 1;

  constructor(
    private router: Router, 
    private navigationService: NavigationService,) {
    this.navigationService.footerVisible = false;

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
  
  ngOnInit(): void {
    this.navigationService.mapHeader = false;
    this.navigationService.defaultHeader = false;
  }
}
