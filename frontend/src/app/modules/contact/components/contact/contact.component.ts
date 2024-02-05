import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnDestroy{
  @ViewChild('comment') inputComment!: ElementRef;
  public loading: boolean = false;

  private contact$!: Subscription;
  
  public contactForm: FormGroup = new FormGroup({
    comment: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  
  constructor(
    private navigationService: NavigationService,
    private http: HttpClient,
    private alertService: AlertService
    ) {
    this.navigationService.headerTitle = 'Contacto e incidencias';
    this.navigationService.footerVisible = false;
  }

  send(){
    this.loading = true;
    this.contact$ = this.http.post(`${environment.BACKEND_BASE_URL}/contact`, this.contactForm.value).subscribe({
      next: (response: any) => {
        this.alertService.success('Tu mensaje ha sido enviado',{autoClose: true, keepAfterRouteChange: true});
        this.loading = false;
      },
      error: () => {
        this.alertService.error('Ha ocurrido un error al enviar el mensaje',{autoClose: true, keepAfterRouteChange: false});
        this.loading = false;
      }
    });
    
  }

  public resizeTextArea(): void {
    const commentary = this.inputComment.nativeElement as HTMLTextAreaElement;
    commentary.style.height = '1px';
    commentary.style.height = commentary.scrollHeight + 'px';
  }

  ngOnDestroy(): void {
    this.contact$.unsubscribe();
  }

}
