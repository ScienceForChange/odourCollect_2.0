import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { RegisterModalComponent } from './register-modal.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterModalComponent', () => {
  let component: RegisterModalComponent;
  let fixture: ComponentFixture<RegisterModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbActiveModal],
      imports: [RouterTestingModule],
      declarations: [RegisterModalComponent]
    });
    fixture = TestBed.createComponent(RegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
