import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  
  private _visible = new BehaviorSubject<boolean>(false);

  get visible():boolean{
    return this._visible.value;
  }
  
  set visible(value:boolean){
    this._visible.next(value);
  }

  get isVisibleState() {
    return this._visible;
  }

  toggleVisible() {
    this.visible = !this.visible;
  }

}
