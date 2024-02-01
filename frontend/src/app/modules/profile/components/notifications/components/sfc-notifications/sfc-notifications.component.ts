import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppNotification } from 'src/app/models/app-notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-sfc-notifications',
  templateUrl: './sfc-notifications.component.html',
  styleUrls: ['./sfc-notifications.component.scss']
})
export class SfcNotificationsComponent {

  public notifications:AppNotification[] = this.notificationService.sfcNotification.value;
  
  private $notifications!: Subscription;

  constructor( private notificationService: NotificationService ) { }

  ngOnInit(): void {
    this.$notifications = this.notificationService.sfcNotification.subscribe(value => {
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
