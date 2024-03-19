import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public newNotification: boolean = false;
  constructor(private notificationService:NotificationService) {}

  ngOnInit(): void {
    this.notificationService.newNotification.subscribe({
      next: (resp) => {
        this.newNotification = resp;
      }
    })
  }

}
