import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RecoverPasswordComponent } from './recover-password.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';

describe('RecoverPasswordComponent', () => {
  let component: RecoverPasswordComponent;
  let fixture: ComponentFixture<RecoverPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgControl],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, SharedComponentsModule],
      declarations: [RecoverPasswordComponent]
    });
    fixture = TestBed.createComponent(RecoverPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
