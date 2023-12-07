import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AddOdourComponent } from './add-odour.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AddOdourComponent', () => {
  let component: AddOdourComponent;
  let fixture: ComponentFixture<AddOdourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, FormsModule, ReactiveFormsModule, SharedComponentsModule],
      declarations: [AddOdourComponent, SpinnerComponent, SpinnerComponent]
    });
    fixture = TestBed.createComponent(AddOdourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
