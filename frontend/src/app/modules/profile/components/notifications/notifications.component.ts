import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router} from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';
import { AppNotification } from 'src/app/models/app-notification';
import { NavigationService } from 'src/app/services/navigation.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('marker') marker!:ElementRef;
  private activeOption!:Element | null;
  private resize$!:Subscription;
  private router$!:Subscription;
  private sfcNotifications$!:Subscription;
  private socialNotifications$!:Subscription;
  public notifications!: AppNotification;
  public newSfcNotification:boolean = true;
  public newSocialNotification:boolean = true;

  constructor( 
    private notifcationService: NotificationService,
    private router: Router,
    private navigationService: NavigationService,
   ) { 
      this.notifcationService.refresh = true;
      this.navigationService.backTo = '/profile';
      if(!this.notifcationService.checking) this.notifcationService.checkNotifications();
  }
  
  ngOnInit(): void {

    this.resize$ = fromEvent(window, 'resize').subscribe(() => 
    {
      this.marker.nativeElement.classList.remove('transition');
      this.moveMarker()
    });

    this.router$ = this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.moveMarker();
      }
    })

    this.sfcNotifications$ = this.notifcationService.sfcNotification.subscribe({
      next: (resp) => {
        this.newSfcNotification = resp.length > 0;
      }
    })
    
    this.socialNotifications$ = this.notifcationService.socialNotification.subscribe({
      next: (resp) => {
        this.newSocialNotification = resp.length > 0;
      }
    })
      
  }
  ngAfterViewInit(): void {
    this.moveMarker();
  }
  public moveMarker(e:Event | null = null): void {
    const url = this.router.url;
    const lastSegment = url.split('/').pop();
    this.activeOption = e ? e.target as Element : document.querySelector(`[routerlink="${lastSegment}"]`);
    this.marker.nativeElement.style.width = this.activeOption?.getBoundingClientRect().width + 'px';
    this.marker.nativeElement.style.left = this.activeOption?.getBoundingClientRect().left + 'px';
    setTimeout(() => {
      this.marker.nativeElement.classList.add('transition'); 
    });
    this.navigationService.backTo = '/profile';
  } 

  ngOnDestroy(): void {
    this.resize$.unsubscribe();
    this.router$.unsubscribe();
    this.sfcNotifications$.unsubscribe();
    this.socialNotifications$.unsubscribe();
    this.notifcationService.refresh = false;
  }
}
