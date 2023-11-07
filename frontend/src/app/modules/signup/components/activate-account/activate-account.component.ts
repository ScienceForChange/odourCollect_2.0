import { Component, Input } from '@angular/core';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss'],
})
export class ActivateAccountComponent {
  public class = 'violet-icon';

  @Input()
  activateAccount!: () => void;

  constructor(private footerService: FooterService) {
    this.footerService.visible = false;
  }

}
