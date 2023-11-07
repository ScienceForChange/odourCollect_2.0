import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observation } from 'src/app/models/observation';

@Component({
  selector: 'app-my-odour-card',
  templateUrl: './odour-card.component.html',
  styleUrls: ['./odour-card.component.scss'],
})
export class OdourCardComponent {
  @Input()
  observation!: Observation;

  @Output()
  public deleteObservation = new EventEmitter();

  public iconClass = 'icon-size33 violet-icon';

  onDeleteClick() {
    this.deleteObservation.emit(this.observation?.id);
  }
}
