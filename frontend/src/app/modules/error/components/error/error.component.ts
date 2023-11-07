import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common'
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnDestroy{

  private refreshToken$!: Subscription;

  public loading: boolean = false;

  constructor(
    private authService: AuthService,
    private footerService: FooterService,
    private location: Location,
  ){
    this.footerService.visible = false;
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
    this.refreshToken$.unsubscribe();
  }

}
