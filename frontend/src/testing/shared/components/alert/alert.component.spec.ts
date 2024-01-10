import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from '../../../../app/shared/components/alert/alert.component';
import { AlertType } from 'src/app/models/alert';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertComponent]
    });
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería borrar alertas', () => {

    component.alerts = [{ id: 'default-alert', type: AlertType.Success, message: 'test', fade: false }];
    
    jest.useFakeTimers();
    
    component.removeAlert(component.alerts[0]);
     
    setTimeout(() => {
      expect(component.alerts.length).toBe(0);
    }, 300);
    
    jest.runAllTimers();
  });

  it('debería devolver clases css', () => {

    expect(component.cssClass({ id: 'default-alert', type: AlertType.Success, message: 'test', fade: false })).toEqual('alert alert-dismissible alert-animation container alert-success');

  });

});
