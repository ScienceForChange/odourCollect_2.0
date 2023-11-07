import { Component } from '@angular/core';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-add-odour-button',
  templateUrl: './add-odour-button.component.html',
  styleUrls: ['./add-odour-button.component.scss']
})
export class AddOdourButtonComponent {
  
  public showMenu: string | undefined = undefined;

  toggleShowMenu = (): void => {
    if (this.showMenu === undefined || this.showMenu === 'close')
      this.showMenu = 'open';
    else this.showMenu = 'close';
  };


  constructor(
    private footerService: FooterService
  ) {
    this.footerService.visible = true;
  }

}
