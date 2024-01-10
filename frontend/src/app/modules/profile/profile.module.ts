import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { EditAvatarComponent } from './components/edit-avatar/edit-avatar.component';
import { BadgesComponent } from './components/badges/badges.component';
import { MyStudyZonesComponent } from './components/my-study-zones/my-study-zones.component';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { StudyZoneModule } from './components/study-zone/study-zone.module';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SfcNotificationsComponent } from './components/notifications/components/sfc-notifications/sfc-notifications.component';
import { SocialNotificationsComponent } from './components/notifications/components/social-notifications/social-notifications.component';
import { NotificationComponent } from './components/notifications/components/notification/notification.component';
import { MessageComponent } from './components/notifications/components/message/message.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileSettingsComponent,
    DeleteAccountComponent,
    ChangePasswordComponent,
    PublicProfileComponent,
    EditAvatarComponent,
    BadgesComponent,
    MyStudyZonesComponent,
    NotificationsComponent,
    SfcNotificationsComponent,
    SocialNotificationsComponent,
    NotificationComponent,
    MessageComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedComponentsModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMapLibreGLModule,
    StudyZoneModule,
  ],
})
export class ProfileModule {}
