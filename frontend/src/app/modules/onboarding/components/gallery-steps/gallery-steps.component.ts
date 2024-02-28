import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-gallery-steps',
  templateUrl: './gallery-steps.component.html',
  styleUrls: ['./gallery-steps.component.scss'],
})
export class GalleryStepsComponent implements OnInit {
  public steps: undefined[] = [...Array(4)];
  public step: number | any = 1;
  private timeoutId: any;

  @ViewChildren('carrouselBtn') children!: QueryList<ElementRef>;
  @ViewChild('scrollingDiv') scrollingDiv!: ElementRef;

  constructor(
    private router: Router,
    private navigationService: NavigationService,
  ) {
    this.navigationService.footerVisible = false;
  }

  public updateStep() {
    const scrollLeft = this.scrollingDiv.nativeElement.scrollLeft;
    const containerWidth = this.scrollingDiv.nativeElement.offsetWidth;

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      this.children.forEach(() => {
        if (scrollLeft === 0) {
          return (this.step = 1);
        }
        if (scrollLeft === containerWidth) {
          return (this.step = 2);
        }
        if (scrollLeft === containerWidth * 2) {
          return (this.step = 3);
        }
        if (scrollLeft === containerWidth * 3) {
          return (this.step = 4);
        }
        return;
      });
    }, 200);
  }

  public moveTo = async (step: number) => {
    if (step > 4) this.router.navigate(['/register']);
    else this.step = step;
    const element = document.getElementById(step + '');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  ngOnInit(): void {
    this.navigationService.mapHeader = false;
    this.navigationService.defaultHeader = false;
  }
}
