import { Component, Input } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.scss'],
})
export class CheckEmailComponent {
  public class = 'violet-icon';

  @Input()
  checkEmail!: () => void;

  constructor(
    private navigationService: NavigationService) {
    this.navigationService.footerVisible = false;
  }

}
