import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppNotification } from 'src/app/models/app-notification';
import { MapService } from 'src/app/services/map.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input() notification!:AppNotification;

  constructor( 
    private mapService: MapService,
    private notificationService: NotificationService,
    private route: Router
    ) { }

  public openNotification(){

    if(this.notification.type === 'message'){

      this.route.navigate(['/profile/notifications/message/' + this.notification.data.resource]);
      
    }
    else{

      if(this.notification.type === 'comment')
        this.mapService.seeMoreAbout(this.notification.data.resource, true, true);
      else
        this.mapService.seeMoreAbout(this.notification.data.resource, true);

      this.notificationService.readNotification(this.notification.id);

    }
      
  }
  public timeAgo(): any {

    const date1 = new Date(this.notification.created_at);
    const date2 = new Date();
    
    let diff = Math.abs(date2.getTime() - date1.getTime())/1000;
    
    switch(true){
      case diff < 60:
        return `Hace ${Math.floor(diff)} segundos`;
      case diff < 3600:
        return `Hace ${Math.floor(diff / 60)} minutos`;
      case diff < 86400:
        return `Hace ${Math.floor(diff / 3600)} horas`;
      case diff < 2592000:
        return `Hace ${Math.floor(diff/ 86400)} días`;
      case diff < 31104000:
        return `Hace ${Math.floor(diff / 2592000)} meses`;
      default:
        return `Hace ${Math.floor(diff / 31104000)} años`;
    }

 }

}
