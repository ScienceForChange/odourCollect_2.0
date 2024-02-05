import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  public loading: boolean = false;

  public contactForm: FormGroup = new FormGroup({
    comment: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(
    private navigationService: NavigationService,
    ) {
    this.navigationService.headerTitle = 'Contacto e incidencias';
    this.navigationService.footerVisible = false;
  }

  send(){
    this.loading = true;
    this.loading = false;
  }
}
