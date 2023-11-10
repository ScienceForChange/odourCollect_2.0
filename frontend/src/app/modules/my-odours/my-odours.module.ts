import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OdourCardComponent } from './components/odour-card/odour-card.component';
import { MyOdoursComponent } from './components/my-odours/my-odours.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { FiltersComponent } from './components/filters/filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OdourCardComponent, MyOdoursComponent, FiltersComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class MyOdoursModule {}
