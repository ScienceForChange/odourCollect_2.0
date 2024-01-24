import { Component, OnDestroy } from '@angular/core';
import { UserLogin } from 'src/app/models/user-login';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private user!:        UserLogin;
  public isLogin:       boolean = false;

  public loading:       boolean = false;
  public showPassword:  boolean = false;

  public loginForm:     FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    private router:             Router,
    private authService:        AuthService,
    private navigationService:  NavigationService,
    private alertService:       AlertService
  ) {
    this.navigationService.footerVisible = false;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  send() {
    this.user = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };

    this.loading = true;

    const redirect: null | string = this.authService.routeToRedirect
      ? null
      : '/map';

    this.authService.login(this.user).subscribe({
      next: () => {
        this.loading = true;
        this.alertService.success('¡Sesión iniciada!', { keepAfterRouteChange: true, autoClose: true });
        if (redirect) this.router.navigate([redirect]);
      },
      error: (resp) => {
        if (resp.status == 422) {

          this.loginForm.controls['email'].markAsUntouched();

          document.getElementsByName('email')[0].classList.add('error');

          this.alertService.clear();
          this.alertService.warn('Email o contraseña son incorrectos', { keepAfterRouteChange: false, autoClose: false });

          this.loginForm.controls['password'].reset();

          document.getElementsByName('email')[0].addEventListener('click', function() {
            document.getElementsByName('email')[0].classList.remove('error');
          });
          
        }
        this.loading = false;
      },
    });
  }
  
}
