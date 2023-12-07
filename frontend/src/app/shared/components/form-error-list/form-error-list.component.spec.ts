import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorListComponent } from './form-error-list.component';
import { SharedComponentsModule } from '../shared.components.module';

describe('FormErrorListComponent', () => {
  let component: FormErrorListComponent;
  let fixture: ComponentFixture<FormErrorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedComponentsModule],
      declarations: [FormErrorListComponent]
    });
    fixture = TestBed.createComponent(FormErrorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
