import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';

import { RecoverCreatePasswordComponent } from './recover-create-password.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';

describe('RecoverCreatePasswordComponent', () => {
  let component: RecoverCreatePasswordComponent;
  let fixture: ComponentFixture<RecoverCreatePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule, HttpClientModule, SharedComponentsModule],
      declarations: [RecoverCreatePasswordComponent]
    });
    fixture = TestBed.createComponent(RecoverCreatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
