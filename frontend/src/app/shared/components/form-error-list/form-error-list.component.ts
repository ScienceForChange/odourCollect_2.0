import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-error-list',
  templateUrl: './form-error-list.component.html',
  styleUrls: ['./form-error-list.component.scss']
})
export class FormErrorListComponent {

  @Input() errorList: ValidationErrors | null | undefined
  
}
