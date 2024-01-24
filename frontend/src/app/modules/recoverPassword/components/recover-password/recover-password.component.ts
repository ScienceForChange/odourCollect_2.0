import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/services/navigation.service';
import { RecoverPasswordService } from 'src/app/services/recover-password.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent {
  public loading: boolean = false;

  public checkEmail: boolean = false;

  public recoverPassword: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });

  constructor(
    private recoverPasswordService: RecoverPasswordService,
    private navigationService: NavigationService,
  ) {
    this.navigationService.footerVisible = false;
  }

  toggleCheckEmail(): void {
    this.checkEmail = !this.checkEmail;
  }

  send() {
    this.loading = true;

    this.recoverPasswordService
      .postEmail(this.recoverPassword.value.email!)
      .subscribe({
        next: (resp) => {
          this.checkEmail = true;
          this.loading = false;
        },
        error: (resp) => {
          this.recoverPassword.controls['email'].setErrors({ incorrect: true });
          this.recoverPassword.controls['email'].markAsTouched();
          this.loading = false;
        },
      });
  }
}
