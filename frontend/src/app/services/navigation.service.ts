import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private _footerVisible = new BehaviorSubject<boolean>(false);
  private _defaultHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _mapHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _headerTitle: BehaviorSubject<string | null> = new BehaviorSubject<string | null >(null);
  private _backTo: BehaviorSubject<string | null> = new BehaviorSubject<string | null >(null);

  get defaultHeader(): BehaviorSubject<boolean> {
    return this._defaultHeader;
  }
  set defaultHeader(value: boolean) {
    this._defaultHeader.next(value);
  }
  get mapHeader(): BehaviorSubject<boolean> {
    return this._mapHeader;
  }
  set mapHeader(value: boolean) {
    this._mapHeader.next(value);
  }
  get headerTitle(): BehaviorSubject<string | null> {
    return this._headerTitle;
  }
  set headerTitle(value: string | null) {
    this._headerTitle.next(value);
  }
  get backTo(): BehaviorSubject<string | null> {
    return this._backTo;
  }
  set backTo(value: string | null) {
    this._backTo.next(value);
  }
  get footerVisible():Observable<boolean>{
    return this._footerVisible;
  }
  set footerVisible(value:boolean){
    this._footerVisible.next(value);
  }

  constructor(route: Router) {
    route.events.subscribe((event) => {
      if(event instanceof NavigationStart){
        this.headerTitle = null;
        this.backTo = null;
        this.footerVisible = true;
      }
      else if (event instanceof NavigationEnd) {
        this.displayHeaderByRoute(event);
      }
    });
  }


  private displayHeaderByRoute(event: NavigationEnd): void {
    if (event.url === '/map') {
      this.defaultHeader = false;
      this.mapHeader = true;
    } else {
      this.defaultHeader = true;
      this.mapHeader = false;
    }
  }

 public  toggleFooterVisible() {
    this.footerVisible = !this.footerVisible;
  }

}
