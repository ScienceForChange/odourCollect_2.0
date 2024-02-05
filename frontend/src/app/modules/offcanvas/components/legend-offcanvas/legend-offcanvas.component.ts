import { Component } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-legend-offcanvas',
  templateUrl: './legend-offcanvas.component.html',
  styleUrls: ['./legend-offcanvas.component.scss'],
})
export class LegendOffcanvasComponent {
  constructor(public offcanvas: NgbActiveOffcanvas) {}
}
