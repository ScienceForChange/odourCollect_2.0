import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy{

  private refreshToken$!: Subscription;

  public loading: boolean = false;

  constructor(
    private authService: AuthService,
    private location: Location,
    private navigationService: NavigationService,
  ){
    this.navigationService.footerVisible = false;
  }

  ngOnInit(): void {
    this.navigationService.mapHeader = false;
    this.navigationService.defaultHeader = false;
  }

  public retry(){
    this.loading = true;
    //le pasamos true a la función para indicar que la llamamos desde la página de error.
    this.refreshToken$ = this.authService.refreshToken(true).subscribe({
      next:(resp)=>{
        //si recibimos respuesta afirmativa de refreshToken, redirigimos a la pagina anterior al error.
        if(resp) this.location.back();
        this.loading = false;
      },
      error:()=>{        
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if(this.refreshToken$) this.refreshToken$.unsubscribe();
  }

}
