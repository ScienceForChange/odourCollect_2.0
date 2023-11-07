import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { VerifyGuardActivate } from 'src/app/guards/verify.guard';
import { AuthGuardActivate } from 'src/app/guards/auth.guard';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { EditAvatarComponent } from './components/edit-avatar/edit-avatar.component';

const routes: Routes = [{
  path: "",
    canActivateChild: [AuthGuardActivate, VerifyGuardActivate],
    children:[
      {
        path: 'profile/public-profile',
        component: PublicProfileComponent,
      },
      {
        path: 'profile/settings',
        component: ProfileSettingsComponent,
      },
      {
        path: 'profile/delete-account',
        component: DeleteAccountComponent,
      },
      {
        path: 'profile/change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'profile/edit-avatar',
        component: EditAvatarComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
