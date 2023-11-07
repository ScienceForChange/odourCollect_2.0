import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private isVisible: string | undefined = undefined;
  private _visible: BehaviorSubject<string | undefined>;

  constructor() {
    this._visible = new BehaviorSubject<string | undefined>(undefined);
  }
  get isVisibleState() {
    return this._visible.asObservable();
  }

  public toggleVisible() {
    if (this.isVisible === undefined || this.isVisible === 'close') {
      this.isVisible = 'open';
      this._visible.next(this.isVisible);
    } else {
      this.isVisible = 'close';
      this._visible.next(this.isVisible);
    }
  }

  public updateStateMenu(value: undefined | string) {
    this.isVisible = value;
    this._visible.next(this.isVisible);
  }
}
