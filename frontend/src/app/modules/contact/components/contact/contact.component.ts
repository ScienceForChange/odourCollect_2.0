import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  @ViewChild('comment') inputComment!: ElementRef;
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
  

  public resizeTextArea(): void {
    const commentary = this.inputComment.nativeElement as HTMLTextAreaElement;
    commentary.style.height = '1px';
    commentary.style.height = commentary.scrollHeight + 'px';
  }
}
