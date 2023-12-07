import { Component } from '@angular/core';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  public showMenu: string | undefined = undefined;

  toggleShowMenu = (): void => {
    if (this.showMenu === undefined || this.showMenu === 'close')
      this.showMenu = 'open';
    else this.showMenu = 'close';
  };

  constructor(
    private footerService: FooterService,
  ) {
    this.footerService.visible = true;
  }
}
