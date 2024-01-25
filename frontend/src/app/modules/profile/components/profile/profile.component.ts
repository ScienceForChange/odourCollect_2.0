import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AboutTrainedUserComponent } from 'src/app/modules/information/components/about-trained-user/about-trained-user.component';
import { NavigationService } from 'src/app/services/navigation.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy{
  public user: User | undefined = this.userService.user;
  public newNotification:boolean = false;
  private $newNotification!: Subscription;

  constructor(
    private userService: UserService,
    private offcanvasService: NgbOffcanvas,
    private notificationService: NotificationService,
    private navigationService: NavigationService,
  ) {
    this.newNotification = true;
    this.navigationService.backTo = '/map';
  }

  ngOnInit(){
    this.$newNotification = this.notificationService.newNotification.subscribe({
      next: (resp) => {
        this.newNotification = resp;
      }
    })
  }
  openInfoOffcanvas(){
    this.offcanvasService.open(AboutTrainedUserComponent, {  position: 'start', scroll: false, panelClass: 'about-canvas'});
  }
  
  ngOnDestroy(): void {
    this.$newNotification.unsubscribe();
  }
}
