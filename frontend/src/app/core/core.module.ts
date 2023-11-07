import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderModule } from './layout/header/header.module';
import { SignupModule } from '../modules/signup/signup.module';
import { LoginModule } from '../modules/login/login.module';
import { RecoverPasswordModule } from '../modules/recoverPassword/recover-password.module';
import { RecoverCreatePasswordModule } from '../modules/recoverCreatePassword/recover-create-password.module';
import { OnBoardingModule } from '../modules/onboarding/onboarding.module';
import { FaqsModule } from '../modules/faqs/faqs.module';
import { MapModule } from '../modules/map/map.module';
import { ProfileModule } from '../modules/profile/profile.module';

import { FooterComponent } from './layout/footer/footer.component';
import { SharedComponentsModule } from '../shared/components/shared.components.module';
import { MainComponent } from './layout/main/main.component';
import { AddOdourModule } from '../modules/add-odour/add-odour.module';
import { VerifyEmailModule } from '../modules/verify-email/verify-email.module';
import { MyOdoursModule } from '../modules/my-odours/my-odours.module';
import { ContactModule } from '../modules/contact/contact.module';
import { InformationModule } from '../modules/information/information.module';
import { ModalsModule } from '../modules/modals/modals.module';
import { OffcanvasModule } from '../modules/offcanvas/offcanvas.module';
import { ErrorModule } from '../modules/error/error.module';


@NgModule({
  declarations: [FooterComponent, MainComponent],
  exports: [FooterComponent, MainComponent],
  imports: [
    AddOdourModule,
    CommonModule,
    ContactModule,
    CoreRoutingModule,
    FaqsModule,
    HeaderModule,
    LoginModule,
    MapModule,
    ModalsModule,
    OffcanvasModule,
    MyOdoursModule,
    OnBoardingModule,
    ProfileModule,
    RecoverCreatePasswordModule,
    RecoverPasswordModule,
    SharedComponentsModule,
    SignupModule,
    VerifyEmailModule,
    InformationModule,
    ErrorModule
  ],
})
export class CoreModule {}
