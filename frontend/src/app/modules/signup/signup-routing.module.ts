import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSettingsComponent } from '../profile/components/profile-settings/profile-settings.component';
import { DeleteAccountComponent } from '../profile/components/delete-account/delete-account.component';

const routes: Routes = [
  {
    path: 'profile/settings',
    component: ProfileSettingsComponent,
  },
  {
    path: 'profile/delete-account',
    component: DeleteAccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
