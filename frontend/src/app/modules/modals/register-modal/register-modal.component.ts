import { Component, Input, Type } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoCircleComponent } from 'src/app/shared/components/Icons/info-circle/info-circle.component';
import { InfoSquareComponent } from 'src/app/shared/components/Icons/info-square/info-square.component';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent {

  @Input() config!: {
    icon:                 Type<any> | null, //Componente icon para monstrar en la parte superior
    text:                 string | null,    //Texto a mostrar en el modal
    registerButtonText:   string | null,    //Texto a mostrar en el botón Aceptar
    loginButtonText:    string | null,    //Clase css para el botón Aceptar
  };

  public iconInputs:{} = {
    iconClass : 'xl icon-violet'
  }

  constructor(
    public modal: NgbActiveModal
  ) {
    this.config = {
      icon: InfoCircleComponent,
      text: null,
      registerButtonText: null,
      loginButtonText: null

    }
  } 
}
