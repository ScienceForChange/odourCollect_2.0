import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss'],
})
export class CommentDetailsComponent {
  @Input() public commentDetails!: FormGroup;
}
