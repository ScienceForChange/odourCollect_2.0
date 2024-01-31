import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { OdourTypeData } from 'src/app/models/odour-related-data';
import { AboutOdourSourceComponent } from 'src/app/modules/information/components/about-odour-source/about-odour-source.component';
import { OffcanvasService } from 'src/app/services/offcanvas.service';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss'],
})
export class CommentDetailsComponent {
  @Input() public commentDetails!: FormGroup;
  @Input() public selectedType!: OdourTypeData;

  constructor(private offcanvasService: OffcanvasService) {}

  openInfoOffcanvas() {
    this.offcanvasService.openAboutOdourSourceComponentOffCanvas();
  }
}
