import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { InfoModalComponent } from '../../../app/modules/modals/info-modal/info-modal.component';
import { By } from '@angular/platform-browser';

describe('InfoModalComponent', () => {
  let component: InfoModalComponent;
  let fixture: ComponentFixture<InfoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbActiveModal],
      declarations: [InfoModalComponent]
    });
    fixture = TestBed.createComponent(InfoModalComponent);
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
      icon:               null,
      text:               null,
      acceptButtonText:   null,
      acceptButtonClass:  'click-me',
      buttonCallBack:     null

    }
    fixture.detectChanges();

    fixture.debugElement.query(By.css(`.${component.config.acceptButtonClass}`)).triggerEventHandler('click', null);

    expect(component.modal.dismiss).toHaveBeenCalledWith(true);

  });

  it('should to execute the callback function when the accept button is clicked', async () => {

    // Espía el método de cierre del modal
    jest.spyOn(component.modal, 'dismiss')

    const callback = jest.fn();

    component.config = {
      icon:               null,
      text:               null,
      acceptButtonText:   null,
      acceptButtonClass:  'click-me',
      buttonCallBack:     callback(true)
    }
    fixture.detectChanges();

    fixture.debugElement.query(By.css(`.${component.config.acceptButtonClass}`)).triggerEventHandler('click', null);

    expect(callback).toHaveBeenCalledWith(true);

  });

});
