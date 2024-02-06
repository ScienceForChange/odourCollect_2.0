import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { ContactComponent } from '../../../app/modules/contact/components/contact/contact.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from 'src/environments/environment';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let alertService: AlertService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, SharedComponentsModule, HttpClientTestingModule],
      declarations: [ContactComponent]
    });
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertService);  
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería pasar todo el proceso de envíar un mensaje correctamente', () => {

    // Añadimos texto al control message
    component.contactForm.controls['message'].setValue('This is a test message');

    // Crear un espía para alertService.success
    const spy = jest.spyOn(alertService, 'success');

    // Esperamos que el formulario sea válido
    expect(component.contactForm.valid).toBeTruthy();

    fixture.detectChanges();

    // Llamamos al método send
    component.send();
    
    // Esperamos que se haya hecho una petición POST a la URL correcta
    const req = http.expectOne(`${environment.BACKEND_BASE_URL}api/contact`);
    expect(req.request.method).toBe('POST');
    req.flush({success: true});

    // Esperamos que el método alertService.success haya sido llamado
    expect(spy).toHaveBeenCalled();
    
    fixture.detectChanges();

    // Esperamos que el control message esté vacío
    expect(component.contactForm.controls['message'].value).toBe(null);
  });

  it('debería dar error al enviar el mensaje', () => {

    // Añadimos texto al control message
    component.contactForm.controls['message'].setValue('This is a test message');

    // Crear un espía para alertService.error
    const spy = jest.spyOn(alertService, 'error');

    // Esperamos que el formulario sea válido
    expect(component.contactForm.valid).toBeTruthy();

    fixture.detectChanges();

    // Llamamos al método send
    component.send();
    
    // Esperamos que se haya hecho una petición POST a la URL correcta
    const req = http.expectOne(`${environment.BACKEND_BASE_URL}api/contact`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Error'));

    // Esperamos que el método alertService.error haya sido llamado
    expect(spy).toHaveBeenCalled();
    
    fixture.detectChanges();

    // Esperamos que el control message no esté vacío
    expect(component.contactForm.controls['message'].value).toBe('This is a test message');
  });
});
