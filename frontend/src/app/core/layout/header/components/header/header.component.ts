import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '../../../../../services/navigation.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy{
  public showMenu: string | undefined = undefined;
  public showUserObservations: boolean = false;
  public showDefaultHeader: boolean = false;
  public showMapHeader: boolean = false;
  public title: string | null = null;
  private $defaultHeader!: Subscription;
  private $mapHeader!: Subscription;
  private $headerTitle!: Subscription;

  constructor(
    private navigationService: NavigationService,
  ) {}

  ngOnInit(): void {
    this.$defaultHeader = this.navigationService.defaultHeader.subscribe((value) => {
      this.showDefaultHeader = value;
    });
    this.$mapHeader = this.navigationService.mapHeader.subscribe((value) => {
      this.showMapHeader = value;
    });
    this.$headerTitle = this.navigationService.headerTitle.subscribe((value) => {
      this.title = value;
    });
  }

  ngOnDestroy(): void {
    this.$defaultHeader.unsubscribe();
    this.$mapHeader.unsubscribe();
    this.$headerTitle.unsubscribe();
  }
}
