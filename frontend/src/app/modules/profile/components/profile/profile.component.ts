import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { NavigationService } from 'src/app/services/navigation.service';
import { NotificationService } from 'src/app/services/notification.service';
import { OffcanvasService } from 'src/app/services/offcanvas.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user: User | undefined = this.userService.user;
  public newNotification: boolean = false;
  private $newNotification!: Subscription;

  constructor(
    private userService: UserService,
    private offcanvasService: OffcanvasService,
    private notificationService: NotificationService,
    private navigationService: NavigationService,
  ) {
    this.newNotification = true;
    this.navigationService.backTo = '/map';
  }

  ngOnInit() {
    this.$newNotification = this.notificationService.newNotification.subscribe({
      next: (resp) => {
        this.newNotification = resp;
      },
    });
  }

  downloadObservations() {
    this.userService.downloadObservations();
  };

  openInfoOffcanvas() {
    this.offcanvasService.openAboutTrainedOffcanvas();
  }

  ngOnDestroy(): void {
    this.$newNotification.unsubscribe();
  }
}
