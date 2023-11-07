import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { RouterModule } from '@angular/router';
import { GalleryStepsComponent } from './components/gallery-steps/gallery-steps.component';
import { RegisterComponent } from './components/register/register.component';
import {HomeComponent} from './components/home/home.component'

@NgModule({
  declarations: [HomeComponent, GalleryStepsComponent, RegisterComponent],
  exports: [],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedComponentsModule,
    RouterModule,
  ],
})
export class OnBoardingModule {}
