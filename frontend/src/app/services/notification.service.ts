import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap} from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppNotification } from '../models/app-notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  /*
  notificationService: servicio que se encarga de revisar las notificaciones del usuario
  y almacenarlas en los BehaviorSubject correspondientes

  newNotification: BehaviorSubject que indica si hay notificaciones nuevas
  sfcNotification: BehaviorSubject que contiene las notificaciones de tipo mensajes de SFC
  socialNotification: BehaviorSubject que contiene las notificaciones de tipo social, como likes

  refresh: booleano que indica si se debe seguir revisando las notificaciones aun cuando ya hayan notificaciones nuevas
  timer: tiempo en milisegundos que se espera para revisar las notificaciones cuando está en bucle
  checking: booleano que indica si se está revisando las notificaciones en bucle para no hacerlo más de una vez
  
  */
  public newNotification:     BehaviorSubject<boolean>  = new BehaviorSubject<boolean>(false);
  public sfcNotification:     BehaviorSubject<AppNotification[]>    = new BehaviorSubject<AppNotification[]>([]);
  public socialNotification:  BehaviorSubject<AppNotification[]>    = new BehaviorSubject<AppNotification[]>([]);

  private login: boolean = false;
  private timer: number = 5000;

  public refresh: boolean = false;
  public checking: boolean = true;

  constructor(private authService: AuthService, private http: HttpClient) { 
    authService.isLoggedIn.subscribe({
      next: (resp : boolean) => {
        this.login = resp;
        this.checkNotifications();
      }
    })
  }

  // checkNotifications: método que revisa las notificaciones del usuario
  // si hay notificaciones nuevas, las clasifica por tipo y las guarda en los BehaviorSubject
  // si no hay notificaciones nuevas, sigue revisando cada 5 segundos
  // si hay notificaciones nuevas se deja de revisar si no se indica lo contrario con el atributo refresh
  public checkNotifications():void {

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
        },
        error: () => {
          setTimeout(() => {
            this.checkNotifications();
          }, this.timer * 5);
        }
      });
     
    }
    else{
      this.newNotification.next(false);
    }

  }

  //getNotifications: método que obtiene las notificaciones del usuario
  public getNotifications():Observable<AppNotification[]> {
    return this.http.get(`${environment.BACKEND_BASE_URL}api/notifications`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    }).pipe(
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

  //classifyNotificationsByType: método que clasifica las notificaciones por tipo
  private classifyNotificationsByType(notifications: AppNotification[]):void{

    let socialNotifications: AppNotification[] = [];
    let sfcNotifications: AppNotification[] = [];

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

  //readNotification: método que marca una notificación como leída
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
