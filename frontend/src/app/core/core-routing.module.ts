import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../modules/login/components/login.component';
import { SignupComponent } from '../modules/signup/components/signup/signup.component';
import { RecoverPasswordComponent } from '../modules/recoverPassword/components/recover-password/recover-password.component';
import { RecoverCreatePasswordComponent } from '../modules/recoverCreatePassword/components/recover-create-password/recover-create-password.component';
import { HomeComponent } from '../modules/onboarding/components/home/home.component';
import { GalleryStepsComponent } from '../modules/onboarding/components/gallery-steps/gallery-steps.component';
import { RegisterComponent } from '../modules/onboarding/components/register/register.component';
import { MapComponent } from '../modules/map/components/map/map.component';
import { ProfileComponent } from '../modules/profile/components/profile/profile.component';
import {
  AuthGuardActivate,
  AuthGuardHomePage,
  AuthGuardLogoutActivate,
} from '../guards/auth.guard';
import { AboutOddourComponent } from '../modules/information/components/about-oddour/about-oddour.component';
import { FaqsComponent } from '../modules/faqs/components/faqs/faqs.component';
import { VerifyEmailComponent } from '../modules/verify-email/components/verify-email/verify-email.component';
import {
  UnverifyGuardActivate,
  VerifyGuardActivate,
} from '../guards/verify.guard';
import { AddOdourComponent } from '../modules/add-odour/components/add-odour/add-odour.component';
import { MyOdoursComponent } from '../modules/my-odours/components/my-odours/my-odours.component';
import { ContactComponent } from '../modules/contact/components/contact/contact.component';
import { ErrorComponent } from '../modules/error/components/error/error.component';
import { errorActivateGuard, notErrorActivateGuard } from '../guards/error-activate.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardHomePage],
  },
  {
    path: 'home',
    component: HomeComponent,

    canActivate: [AuthGuardLogoutActivate],
  },
  {
    path: 'onboarding',
    component: GalleryStepsComponent,
    canActivate: [AuthGuardLogoutActivate],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuardLogoutActivate],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardLogoutActivate],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AuthGuardLogoutActivate],
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent,
    canActivate: [AuthGuardLogoutActivate],
  },
  {
    path: 'password-reset/:token',
    component: RecoverCreatePasswordComponent,
    canActivate: [AuthGuardLogoutActivate],
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    canActivate: [AuthGuardActivate, UnverifyGuardActivate],
    loadChildren: () =>import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'map',
    canActivate: [notErrorActivateGuard],
    component: MapComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardActivate, VerifyGuardActivate],
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'frequently-asked-questions',
    component: FaqsComponent,
  },
  {
    path: 'my-odours',
    component: MyOdoursComponent,
    canActivate: [AuthGuardActivate, VerifyGuardActivate],
  },
  {
    path: 'about-odourcollect',
    component: AboutOddourComponent,
  },
  {
    path: 'create-odour',
    component: AddOdourComponent,
    canActivate: [AuthGuardActivate, VerifyGuardActivate],
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
    canActivate: [errorActivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
