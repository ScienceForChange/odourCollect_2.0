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

  constructor( private notificationService: NotificationService ) { }

  ngOnInit(): void {
    this.$notifications = this.notificationService.socialNotification.subscribe(value => {
      // Filtra las notificaciones que no están en this.notifications
      const newNotifications = value.filter(notification => {
        return !this.notifications.find(n => {
          return n.id === notification.id
        });
      }).map(notification => {
         notification.isAdded = true;
         return notification;
      });
      this.notifications.unshift(...newNotifications.reverse());
    })
  }

  ngOnDestroy(): void {
    this.$notifications.unsubscribe();
  }

}
