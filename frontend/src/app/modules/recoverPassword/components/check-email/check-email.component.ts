import { Component, Input } from '@angular/core';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.scss'],
})
export class CheckEmailComponent {
  public class = 'violet-icon';

  @Input()
  checkEmail!: () => void;

  constructor(private footerService: FooterService) {
    this.footerService.visible = false;
  }

}
