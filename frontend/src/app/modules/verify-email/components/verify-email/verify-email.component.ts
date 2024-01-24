import { Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnDestroy {

  @ViewChild('sendButton') sendButton!: ElementRef;

  resendVerifymail$!: Subscription;

  constructor(
    private navigationService: NavigationService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router

    ) {
    this.navigationService.footerVisible = false;
  }
  
  resendVerifyEmail(){
    this.sendButton.nativeElement.classList.add('loading');
    this.sendButton.nativeElement.disabled = true;
    if(!this.authService.isVerified){
      this.resendVerifymail$ = this.authService.resendVerifyEmail().subscribe({
        next:()=>{

          this.alertService.success('Email de verificación reenviado, revisa tu cuenta.', {
            autoClose: false,
            keepAfterRouteChange: true
          });
          
          this.sendButton.nativeElement.classList.remove('loading');
          this.sendButton.nativeElement.disabled = false;

        },
        error:()=>{
          
          this.alertService.error('Hubo un error, vuelve a intentarlo más tarde.', {
            autoClose: false,
            keepAfterRouteChange: true
          });
          
          this.sendButton.nativeElement.classList.remove('loading');
          this.sendButton.nativeElement.disabled = false;

        }
      })
    }
    else{
      this.alertService.success('Su correo ya fue verificado.');
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    if(this.resendVerifymail$) this.resendVerifymail$.unsubscribe();
  }

  logoutAndRedirect(){
    this.authService.logout('/signup')
  }

}
