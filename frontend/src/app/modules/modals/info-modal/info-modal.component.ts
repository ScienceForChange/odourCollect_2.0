import { Component, Input, Type } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent {
  //Opciones que pasar al componente infoModal
  @Input() config!: {
    icon:               Type<any> | null, //Componente icon para monstrar en la parte superior
    text:               string | null,    //Texto a mostrar en el modal
    acceptButtonText:   string | null,    //Texto a mostrar en el botón Aceptar
    acceptButtonClass:  string | null,    //Clase css para el botón Aceptar
  };

  public iconInputs:{} = {
    iconClass : 'xl icon-violet'
  }

  constructor(
    public modal: NgbActiveModal
  ) {} 
}
