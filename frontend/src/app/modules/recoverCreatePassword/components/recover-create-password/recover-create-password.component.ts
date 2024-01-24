import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoverPasswords } from 'src/app/models/recover-password';
import { NavigationService } from 'src/app/services/navigation.service';
import { RecoverCreatePasswordService } from 'src/app/services/recover-create-password.service';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validator';

@Component({
  selector: 'app-recover-create-password',
  templateUrl: './recover-create-password.component.html',
  styleUrls: ['./recover-create-password.component.scss'],
})
export class RecoverCreatePasswordComponent {
  public loading: boolean = false;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public passwords!: RecoverPasswords;
  private token!: string | null;
  private email!: string | null;

  public createPasswordRecover: FormGroup = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      password_confirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    [
      ConfirmPasswordValidator.MatchValidator(
        'password',
        'password_confirmation'
      ),
    ]
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recoverCreatePasswordService: RecoverCreatePasswordService,
    private navigationService: NavigationService,
  ) {
    this.navigationService.footerVisible = false;

    this.token = this.route.snapshot.paramMap.get('token');
    this.email = this.route.snapshot.queryParamMap.get('email');
    if (!this.token && !this.email) {
      this.router.navigate(['/']);
    }
  }

  get passwordMatchError() {
    return (
      this.createPasswordRecover.getError('mismatch') &&
      this.createPasswordRecover.get('password_confirmation')?.touched
    );
  }

  public pass =
    this.createPasswordRecover.getError('mismatch') &&
    this.createPasswordRecover.get('password_confirmation')?.touched;

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  send() {
    this.passwords = {
      password: this.createPasswordRecover.value.password!,
      password_confirmation:
        this.createPasswordRecover.value.password_confirmation!,
      token: this.token,
      email: this.email,
    };
    this.loading = true;

    this.recoverCreatePasswordService
      .postCreatePasswords(this.passwords)
      .subscribe({
        next: () => {
          this.loading = false;

          this.router.navigate(['/login']);
        },
        error: ( resp ) => {
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
