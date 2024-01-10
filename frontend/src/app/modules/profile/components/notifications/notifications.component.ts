import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router} from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';
import { FooterService } from 'src/app/services/footer.service';
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
  public notificaions: any;
  public newSfcNotification:boolean = true;
  public newSocialNotification:boolean = true;

  constructor( 
    private notifcationService: NotificationService,
    private footerService: FooterService,
    private router: Router,
   ) { 
      this.footerService.visible = true;
      this.notifcationService.refresh = true;
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
        console.log(this.notificaions);
      }
    })
    this.socialNotifications$ = this.notifcationService.socialNotification.subscribe({
      next: (resp) => {
        this.newSocialNotification = resp.length > 0;
        console.log(this.notificaions);
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
    this.marker.nativeElement.style.top = this.activeOption?.getBoundingClientRect().top + 'px';
    this.marker.nativeElement.style.height = this.activeOption?.getBoundingClientRect().height + 'px';
    this.marker.nativeElement.classList.add('transition'); 
  } 

  ngOnDestroy(): void {
    this.resize$.unsubscribe();
    this.router$.unsubscribe();
    this.sfcNotifications$.unsubscribe();
    this.socialNotifications$.unsubscribe();
    this.notifcationService.refresh = false;
  }
}
