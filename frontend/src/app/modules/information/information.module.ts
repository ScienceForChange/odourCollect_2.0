import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationComponent } from './components/information/information.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { CoreRoutingModule } from 'src/app/core/core-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AboutOddourComponent } from './components/about-oddour/about-oddour.component';



@NgModule({
  declarations: [
    InformationComponent,
    AboutOddourComponent  
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedComponentsModule,
  ]
})
export class InformationModule { }
