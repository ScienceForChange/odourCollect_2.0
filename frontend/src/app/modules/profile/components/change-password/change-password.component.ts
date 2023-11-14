import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ChangePasswords } from 'src/app/models/change-password';
import { AlertService } from 'src/app/services/alert.service';
import { FooterService } from 'src/app/services/footer.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  public loading: boolean = false;
  public showCurrentPassword: boolean = false;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public successMessage: boolean = false;
  public errors: string[] = [];
  public errorMessages: { [key: string]: string } = {
    old_password: 'Tu contraseña antigua no es correcta',
  };

  public passwords!: ChangePasswords;

  public createPasswordRecover: FormGroup = new FormGroup(
    {
      old_password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      new_password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      new_password_confirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    [
      ConfirmPasswordValidator.MatchValidator(
        'new_password',
        'new_password_confirmation'
      ),
    ]
  );

  constructor(
    private router: Router,
    private userService: UserService,
    private footerService: FooterService,
    private alertService: AlertService
  ) {
    this.footerService.visible = false;
  }


  get passwordMatchError() {
    return (
      this.createPasswordRecover.getError('mismatch') &&
      this.createPasswordRecover.get('new_password_confirmation')?.touched
    );
  }

  toggleShowCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  send() {
    this.passwords = { ...this.createPasswordRecover.value };

    this.loading = true;

    this.userService.changePassword(this.passwords).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/map']);
        this.alertService.success('¡Contraseña cambiada!',{ keepAfterRouteChange: false, autoClose: true })
        
      },
      error: ( resp ) => {
        console.log(resp)
        if (resp.status == 422) {
          Object.keys(resp.error.errors)
            .map((key) => key)
            .forEach((field) => {
              let errors: { [error: string]: true } = resp.error.errors[field].reduce((acc:any, error:string) => {
                acc[error] = true;
                return acc;
              }, {});
              this.createPasswordRecover.controls[field].setErrors(errors);
              this.createPasswordRecover.controls[field].markAsTouched();
            });
        }
        this.loading = false;
      },
    });
  }
}
