import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { VerifyGuardActivate } from 'src/app/guards/verify.guard';
import { AuthGuardActivate } from 'src/app/guards/auth.guard';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { EditAvatarComponent } from './components/edit-avatar/edit-avatar.component';
import { BadgesComponent } from './components/badges/badges.component';
import { MyStudyZonesComponent } from './components/my-study-zones/my-study-zones.component';
import { StudyZoneComponent } from './components/study-zone/components/study-zone/study-zone.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SocialNotificationsComponent } from './components/notifications/components/social-notifications/social-notifications.component';
import { SfcNotificationsComponent } from './components/notifications/components/sfc-notifications/sfc-notifications.component';
import { MessageComponent } from './components/notifications/components/message/message.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuardActivate, VerifyGuardActivate],
    children: [
      {
        path: 'profile/edit-avatar',
        component: EditAvatarComponent,
      },
      {
        path: 'profile/public-profile',
        component: PublicProfileComponent,
      },
      {
        path: 'profile/settings',
        component: ProfileSettingsComponent,
        // children:[

        //   {
        //     path: 'delete-account',
        //     component: DeleteAccountComponent,
        //   },
        //   {
        //     path: 'change-password',
        //     component: ChangePasswordComponent,
        //   },
        // ]
      },
      {
        path: 'profile/settings/delete-account',
        component: DeleteAccountComponent,
      },
      {
        path: 'profile/settings/change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'profile/badges',
        component: BadgesComponent,
      },
      {
        path: 'profile/my-study-zones',
        component: MyStudyZonesComponent,
      },
      {
        path: 'profile/my-study-zones/id',
        component: StudyZoneComponent,
      },
      {
        path: 'profile/notifications',
        redirectTo: 'profile/notifications/sfc',
      },
      {
        path: 'profile/notifications',
        component: NotificationsComponent,
        children:[
            {
              path: 'social',
              component: SocialNotificationsComponent,
            },
            {
              path: 'sfc',
              component: SfcNotificationsComponent,
            },
          ]
      },
      {
        path: 'profile/notifications/message/:id',
        component: MessageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
