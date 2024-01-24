import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { OdourService } from 'src/app/services/odour.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  public showMenu: string | undefined = undefined;

  toggleShowMenu = (): void => {
    if (this.showMenu === undefined || this.showMenu === 'close')
      this.showMenu = 'open';
    else this.showMenu = 'close';
  };

  constructor(
    private odourService: OdourService,
    private mapService: MapService,
  ) {
  }

  ngOnInit(): void {
    this.odourService.getAllOdours();
    this.mapService.resizeMap();
  }
}
