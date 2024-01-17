import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppNotification } from 'src/app/models/app-notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-social-notifications',
  templateUrl: './social-notifications.component.html',
  styleUrls: ['./social-notifications.component.scss']
})
export class SocialNotificationsComponent implements OnInit, OnDestroy {

  public notifications:AppNotification[] = this.notificationService.socialNotification.value;
  
  private $notifications!: Subscription;
  private $firstCall: boolean = true;

  constructor( private notificationService: NotificationService ) { }

  ngOnInit(): void {
    this.$notifications = this.notificationService.socialNotification.subscribe(value => {
      // Añade la propiedad isAdded a las nuevas notificaciones
      this.notifications = value.map(notification => {
        const existingNotification = this.notifications.find(n => n.id === notification.id);
        if(!existingNotification && !this.$firstCall) {
          notification.isAdded = true;
        }
        return notification;
        
      });
      this.$firstCall = false;
    })
  }

  ngOnDestroy(): void {
    this.$notifications.unsubscribe();
  }

}
