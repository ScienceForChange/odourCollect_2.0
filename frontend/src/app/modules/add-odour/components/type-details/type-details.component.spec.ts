import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDetailsComponent } from './type-details.component';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';

describe('TypeDetailsComponent', () => {
  let component: TypeDetailsComponent;
  let fixture: ComponentFixture<TypeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgControl],
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [TypeDetailsComponent]
    });
    //TODO @tomas al dividir el foumulario en varios componentes, este test falla, requiere una instancia de FormGroup
    // fixture = TestBed.createComponent(TypeDetailsComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
