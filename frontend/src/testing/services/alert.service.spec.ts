import { TestBed } from '@angular/core/testing';

import { AlertService } from '../../app/services/alert.service';
import { Alert, AlertType } from '../../app/models/alert';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    service = new AlertService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Deberían añadirse todos los tipos de alerta al subject', () => {
    
    let expectAlerts: Alert[] = [
      new Alert({ type: AlertType.Success, message: 'Success' }),
      new Alert({ type: AlertType.Error, message: 'Error' }),
      new Alert({ type: AlertType.Info, message: 'Info' }),
      new Alert({ type: AlertType.Warning, message: 'Warning' })
    ];

    let recivedAlerts:Alert[] = [];
    
    const subject = service.onAlert();
    
    subject.subscribe(valor => {
      console.log(valor);
      recivedAlerts.push(valor);
    });
    
    expectAlerts.forEach(alert => {
      service.alert(alert);
      console.log(alert)
    });
    
    expect(recivedAlerts).toEqual(expectAlerts);

    service.clear();
    expectAlerts.push({fadeIn:true, id: 'default-alert'});

    expect(recivedAlerts).toEqual(expectAlerts);

  });
});
