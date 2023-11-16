import { Component, Input, Type } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent {
  //Opciones que pasar al componente infoModal
  @Input() config!: {
    icon: Type<any> | null; //Componente icon para monstrar en la parte superior
    text: string | null; //Texto a mostrar en el modal
    acceptButtonText: string | null; //Texto a mostrar en el botón Aceptar
    acceptButtonClass: string | null; //Clase css para el botón Aceptar
    buttonCallBack: () => void | null;// Callback en caso de querer hacer alguna función más
  };

  public iconInputs: {} = {
    iconClass: 'xl icon-violet',
  };

  public actionToDo() {
    if (this.config.buttonCallBack) {
      this.config.buttonCallBack();
    }
    this.modal.dismiss(true);
  }

  constructor(public modal: NgbActiveModal) {}
}
