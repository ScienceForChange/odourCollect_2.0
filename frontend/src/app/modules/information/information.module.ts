import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { HttpClientModule } from '@angular/common/http';
import { AboutTrainedUserComponent } from './components/about-trained-user/about-trained-user.component';
import { AboutBadgesComponent } from './components/about-badges/about-badges.component';
import { AboutStudyZoneComponent } from './components/about-study-zone/about-study-zone.component';
import { AboutOdourCollectComponent } from './components/about-odour-collect/about-odour-collect.component';
import { AboutDataProtectionComponent } from './components/about-data-protection/about-data-protection.component';
import { AboutEthicalIssuesComponent } from './components/about-ethical-issues/about-ethical-issues.component';
import { AboutOdourSourceComponent } from './components/about-odour-source/about-odour-source.component';
import { AboutIntensityAndPleasentessComponent } from './components/about-intensity-and-pleasentess/about-intensity-and-pleasentess.component';
import { AboutFiltersComponent } from './components/about-filters/about-filters.component';



@NgModule({
  declarations: [
    AboutTrainedUserComponent,
    AboutBadgesComponent,
    AboutStudyZoneComponent,
    AboutOdourCollectComponent,
    AboutDataProtectionComponent,
    AboutEthicalIssuesComponent,
    AboutOdourSourceComponent,
    AboutIntensityAndPleasentessComponent,
    AboutFiltersComponent  
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedComponentsModule,
  ]
})
export class InformationModule { }
