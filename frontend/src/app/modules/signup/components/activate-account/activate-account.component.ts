import { Component, Input } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss'],
})
export class ActivateAccountComponent {
  public class = 'violet-icon';

  @Input()
  activateAccount!: () => void;

  constructor(private navigationService: NavigationService) {
    this.navigationService.footerVisible = false;
  }

}
