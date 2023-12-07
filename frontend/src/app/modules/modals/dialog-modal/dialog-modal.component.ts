import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss']
})
export class DialogModalComponent {
  
  @Input() config: {
    text:               string | null,
    acceptButtonText:   string | null,
    acceptButtonClass:  string,
    cancelButtonText:   string | null,
    cancelButtonClass:  string,
  } = {
    text:               null,
    acceptButtonText:   null,
    acceptButtonClass:  '',
    cancelButtonText:   null,
    cancelButtonClass:  '',
  };
    
  constructor(
    public modal: NgbActiveModal
    ) {} 
}