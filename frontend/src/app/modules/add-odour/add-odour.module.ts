import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOdourComponent } from './components/add-odour/add-odour.component';

import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeDetailsComponent } from './components/type-details/type-details.component';
import { SubtypeDetailsComponent } from './components/subtype-details/subtype-details.component';
import { CommentDetailsComponent } from './components/comment-details/comment-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AddOdourComponent,
    TypeDetailsComponent,
    SubtypeDetailsComponent,
    CommentDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class AddOdourModule {}
