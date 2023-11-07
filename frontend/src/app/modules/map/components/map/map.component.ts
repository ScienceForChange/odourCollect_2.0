import { AfterViewInit, Component } from '@angular/core';
import { FooterService } from 'src/app/services/footer.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  public showMenu: string | undefined = undefined;

  toggleShowMenu = (): void => {
    if (this.showMenu === undefined || this.showMenu === 'close')
      this.showMenu = 'open';
    else this.showMenu = 'close';
  };

  constructor(
    private footerService: FooterService,
    private mapService: MapService,
  ) {
    this.footerService.visible = true;
  }

  ngAfterViewInit(): void {
    if (!this.mapService.getMap()) {
      this.mapService.initializeMap();
    } else {
      this.mapService.invalidatedSize()
    }

  }
}
