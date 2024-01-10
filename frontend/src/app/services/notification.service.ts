import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, tap} from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public newNotification:     BehaviorSubject<boolean>  = new BehaviorSubject<boolean>(false);
  public sfcNotification:     BehaviorSubject<any[]>    = new BehaviorSubject<any[]>([]);
  public socialNotification:  BehaviorSubject<any[]>    = new BehaviorSubject<any[]>([]);

  private login: boolean = false;
  private timer: number = 5000;

  public refresh: boolean = false;
  public checking: boolean = true;

  constructor(private authService: AuthService, private http: HttpClient) { 
    authService.isLoggedIn.subscribe({
      next: (resp) => {
        this.login = resp;
        this.checkNotifications();
      }
    })
  }

  public checkNotifications() {

    if(this.login){

      this.checking = true;

      console.log('checking notifications');
      this.http.get(`${environment.BACKEND_BASE_URL}api/notifications`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true,
      })
      .subscribe({
        next: (resp: any) => {
          if(resp.notifications.length > 0){
            console.log('new notifications');
            this.classifyNotificationsByType(resp.notifications);
            this.newNotification.next(true);
            if(this.refresh){
              setTimeout(() => {
                this.checkNotifications();
              }, this.timer);
            }
            else{
              this.checking = false;
            }
          }
          else{
            if(this.newNotification.value) this.newNotification.next(false);
            setTimeout(() => {
              this.checkNotifications();
            }, this.timer);
          }
        }
      });
     
    }

    else if(!this.login){
      this.newNotification.next(false);
    }

  }


  public getNotifications():Observable<any> {
    return this.http.get(`${environment.BACKEND_BASE_URL}api/notifications`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    }
    ).pipe(
      tap((resp: any) => {
        if(resp.notifications.length > 0){
          this.classifyNotificationsByType(resp.notifications);
          this.newNotification.next(true);
        }
        else{
          if(this.newNotification.value) this.newNotification.next(false);
        }
        this.classifyNotificationsByType(resp.notifications);
      })
    )
  }
  
  private classifyNotificationsByType(notifications: any[]){

    let socialNotifications: any[] = [];
    let sfcNotifications: any[] = [];

    notifications.forEach((notification) => {
      if(notification.type === 'like'){
        socialNotifications.push(notification);
      }
      else{
        sfcNotifications.push(notification);
      }
    });

    if(socialNotifications.length > 0) this.socialNotification.next(socialNotifications);
    if(sfcNotifications.length > 0) this.sfcNotification.next(sfcNotifications);

  }

  public readNotification(id: string):void {

    this.http.get(`${environment.BACKEND_BASE_URL}api/notifications/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    }
    ).subscribe();

    this.socialNotification.next(this.socialNotification.value.filter((notification) => notification.id !== id));
    this.sfcNotification.next(this.sfcNotification.value.filter((notification) => notification.id !== id));

    if(this.socialNotification.value.length === 0 && this.sfcNotification.value.length === 0) this.newNotification.next(false);

  }

}
