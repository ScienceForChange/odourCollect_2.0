import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observation } from 'src/app/models/observation';
import { MapService } from '../../../../services/map.service';

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

  constructor(
    private mapService: MapService,
  ) {}

  public iconClass = 'icon-size33 violet-icon';

  public onDeleteClick() {
    this.deleteObservation.emit(this.observation?.id);
  }

  public seeMore() {
    this.mapService.seeMoreAbout(this.observation.id, true)
  }
}
