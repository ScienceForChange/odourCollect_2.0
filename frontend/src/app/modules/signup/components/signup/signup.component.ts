import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User, SingUpUser } from 'src/app/models/user';
import { SigninService } from 'src/app/services/signin.service';
import { Location } from '@angular/common';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validator';
import { NavigationService } from 'src/app/services/navigation.service';
import { errorFormater } from 'src/app/models/errorFormater';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public loading: boolean = false;

  public years: number[] = [...Array(100).keys()]
    .map((x) => x + new Date().getFullYear() - 114)
    .reverse();
  public currentYear: number = new Date().getFullYear();

  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;

  private user!: SingUpUser;

  public activateAccount: boolean = false;

  public signUpForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      birth_year: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      gender: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      password_confirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      dpo: new FormControl(false, [Validators.requiredTrue]),
      etic: new FormControl(false, [Validators.requiredTrue]),
    },
    [
      ConfirmPasswordValidator.MatchValidator(
        'password',
        'password_confirmation'
      ),
    ]
  );

  constructor(
    private signinService: SigninService,
    private location: Location,
    private navigationService: NavigationService
  ) {
    this.navigationService.footerVisible = false;
  }

  goBack() {
    this.location.back();
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  toggleActivateAccount = (): void => {
    this.activateAccount = !this.activateAccount;
  };

  send(): void {
    this.user = this.signUpForm.value;
    this.loading = true;

    this.signinService.postNewUser(this.user).subscribe({
      next: () => {
        this.loading = false;
        this.activateAccount = true;
      },
      error: (resp) => {
        this.loading = false;
        if (resp.status == 422) {

          this.signUpForm.controls['password'].reset();
          this.signUpForm.controls['password_confirmation'].reset();

          Object.keys(resp.error.errors).forEach((field:string) => {

            let errors = resp.error.errors[field];

            errors = errorFormater(errors);

            this.signUpForm.controls[field].setErrors(errors);
            this.signUpForm.controls[field].markAsTouched();
          });
        }
      },
    });
  }

}
