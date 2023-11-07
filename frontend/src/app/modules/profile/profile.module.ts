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

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileSettingsComponent,
    DeleteAccountComponent,
    ChangePasswordComponent,
    PublicProfileComponent,
    EditAvatarComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedComponentsModule,
    ProfileRoutingModule,
    FormsModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule {}
