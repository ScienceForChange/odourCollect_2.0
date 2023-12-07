import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { SignupComponent } from './signup.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SigninComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, SharedComponentsModule],
      declarations: [SignupComponent]
    });
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
