import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss']
})
export class DefaultHeaderComponent implements OnInit, OnDestroy{
  @Input()  title: string | null = null;

  public backTo: string | null = null;
  private $backto!:Subscription;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.$backto = this.navigationService.backTo.subscribe((value) => {
      this.backTo = value;
    });
  }

  ngOnDestroy(): void {
    this.$backto.unsubscribe();
  }

}
