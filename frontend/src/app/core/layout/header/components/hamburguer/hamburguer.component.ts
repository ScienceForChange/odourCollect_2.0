import { Component } from '@angular/core';

@Component({
  selector: 'app-hamburguer',
  templateUrl: './hamburguer.component.html',
  styleUrls: ['./hamburguer.component.scss'],
})
export class HamburguerComponent {
  public showMenu: string | undefined = undefined;

  constructor() {}

}
