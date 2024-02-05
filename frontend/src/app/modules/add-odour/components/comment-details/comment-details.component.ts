import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { OdourSubType, OdourTypeData } from 'src/app/models/odour-related-data';
import { AboutOdourSourceComponent } from 'src/app/modules/information/components/about-odour-source/about-odour-source.component';
import { OffcanvasService } from 'src/app/services/offcanvas.service';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss'],
})
export class CommentDetailsComponent implements OnInit {
  @Input() public commentDetails!: FormGroup;
  @Input() public selectedType!: OdourTypeData;
  @Input() public selectedSubType: OdourSubType | undefined;

  constructor(private offcanvasService: OffcanvasService) {}

  ngOnInit(): void {
    console.log('selectedSubType', this.selectedSubType);
  }

  openInfoOffcanvas() {
    this.offcanvasService.openAboutOdourSourceComponentOffCanvas();
  }
}
