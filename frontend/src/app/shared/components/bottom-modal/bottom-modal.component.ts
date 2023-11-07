import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bottom-modal',
  templateUrl: './bottom-modal.component.html',
  styleUrls: ['./bottom-modal.component.scss'],
})
export class BottomModalComponent {
  @Input() isOpen: boolean = false;
  @Output() toggleFilters = new EventEmitter<boolean>();
}
