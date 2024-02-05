import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OdourSubType, OdourTypeData } from 'src/app/models/odour-related-data';
import { OffcanvasService } from 'src/app/services/offcanvas.service';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss'],
})
export class CommentDetailsComponent {
  @Input() public commentDetails!: FormGroup;
  @Input() public selectedType!: OdourTypeData;
  @Input() public selectedSubType: OdourSubType | undefined;

  constructor(private offcanvasService: OffcanvasService) {}

  openInfoOffcanvas() {
    this.offcanvasService.openAboutOdourSourceComponentOffCanvas();
  }
}
