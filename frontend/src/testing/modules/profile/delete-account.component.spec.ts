import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { DeleteAccountComponent } from '../../../app/modules/profile/components/delete-account/delete-account.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('DeleteAccountComponent', () => {
  let component: DeleteAccountComponent;
  let fixture: ComponentFixture<DeleteAccountComponent>;
  let authService: AuthService;
  let userService: UserService;
  let routerMock: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, SharedComponentsModule],
      declarations: [DeleteAccountComponent]
    });

    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);
    routerMock = TestBed.inject(Router);

    fixture = TestBed.createComponent(DeleteAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería eliminar la cuenta y redirigir a la raíz', () => {

    authService.isLoggedIn = true;

    component.deleteForm = new FormGroup({
      comment: new FormControl('Comentario de prueba'),
    });

    const response = { status: 200, value: [] };
    jest.spyOn(userService, 'delete').mockReturnValueOnce(of(response));
    jest.spyOn(routerMock, 'navigate');

    component.delete();

    expect(authService.isLoggedIn.value).toBeFalsy();
    expect(userService.delete).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);

  });

  it('debería dar error al eliminar la cuenta', () => {

    component.deleteForm = new FormGroup({
      comment: new FormControl('Comentario de prueba'),
    });
    
    const errorResponse = {
      status: 422,
      error: { errors: { comment: ['Any error'] } },
    };

    jest.spyOn(userService, 'delete').mockReturnValueOnce(throwError(() => errorResponse));
    jest.spyOn(component.deleteForm.controls['comment'], 'setErrors');


    component.delete();

    expect(userService.delete).toHaveBeenCalled();
    expect(component.deleteForm.controls['comment'].setErrors).toHaveBeenCalled();

  });

  it('debería abrirse un modal', () => {

    const spyModal = jest.spyOn(NgbModal.prototype, 'open');

    component.send();

    expect(spyModal).toHaveBeenCalled();

  });

});
