import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { RegisterModalComponent } from '../../../app/modules/modals/register-modal/register-modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('RegisterModalComponent', () => {
  let component: RegisterModalComponent;
  let fixture: ComponentFixture<RegisterModalComponent>;
  let routerMock: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbActiveModal],
      imports: [RouterTestingModule],
      declarations: [RegisterModalComponent]
    });
    routerMock = TestBed.inject(Router);
    fixture = TestBed.createComponent(RegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal', async () => {

    // Espía el método de cierre del modal
    jest.spyOn(component.modal, 'close');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.modal.close).toHaveBeenCalled();

  });

  //TODO: Add more tests

});
