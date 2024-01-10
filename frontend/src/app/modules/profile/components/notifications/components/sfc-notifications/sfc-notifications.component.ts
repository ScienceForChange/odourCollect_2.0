import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-sfc-notifications',
  templateUrl: './sfc-notifications.component.html',
  styleUrls: ['./sfc-notifications.component.scss']
})
export class SfcNotificationsComponent {

  public notifications:any[] = [];
  
  private $notifications!: Subscription;

  constructor( private notificationService: NotificationService ) { }

  ngOnInit(): void {
    this.$notifications = this.notificationService.sfcNotification.subscribe(value => {
      // Añade la propiedad isNew a las nuevas notificaciones
      this.notifications = value.map(notification => {
        const existingNotification = this.notifications.find(n => n.id === notification.id);
        return {...notification, isAdded: !existingNotification};
      });
    })
  }

  ngOnDestroy(): void {
    this.$notifications.unsubscribe();
  }
}
