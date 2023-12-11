import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyZoneComponent } from './components/study-zone/study-zone.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { AboutStudyZoneComponent } from './components/about-study-zone/about-study-zone.component';
import { MoreInfoAboutComponent } from './components/more-info-about/more-info-about.component';

@NgModule({
  declarations: [StudyZoneComponent, AboutStudyZoneComponent, MoreInfoAboutComponent],
  imports: [CommonModule, HttpClientModule, SharedComponentsModule],
  exports: [StudyZoneComponent],
})
export class StudyZoneModule {}
