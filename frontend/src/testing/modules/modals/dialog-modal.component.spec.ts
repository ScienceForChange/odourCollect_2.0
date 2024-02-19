import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DialogModalComponent } from '../../../app/modules/modals/dialog-modal/dialog-modal.component';
import { By } from '@angular/platform-browser';

describe('DialogModalComponent', () => {
  let component: DialogModalComponent;
  let fixture: ComponentFixture<DialogModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbActiveModal],
      declarations: [DialogModalComponent]
    });
    fixture = TestBed.createComponent(DialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the modal when the accept button is clicked', async () => {

    // Espía el método de cierre del modal
    jest.spyOn(component.modal, 'dismiss')

    component.config = {
      text:               null,
      acceptButtonText:   null,
      acceptButtonClass:  'click-me',
      cancelButtonText:   null,
      cancelButtonClass:  '',
    }
    fixture.detectChanges();

    fixture.debugElement.query(By.css(`.${component.config.acceptButtonClass}`)).triggerEventHandler('click', null);

    expect(component.modal.dismiss).toHaveBeenCalledWith(true);

  });

  it('should close the modal when the cancel button is clicked', async () => {

    // Espía el método de cierre del modal
    jest.spyOn(component.modal, 'dismiss')

    component.config = {
      text:               null,
      acceptButtonText:   null,
      acceptButtonClass:  '',
      cancelButtonText:   null,
      cancelButtonClass:  'click-me',
    }
    fixture.detectChanges();

    fixture.debugElement.query(By.css(`.${component.config.cancelButtonClass}`)).triggerEventHandler('click', null);

    expect(component.modal.dismiss).toHaveBeenCalledWith(false);

  });

});
