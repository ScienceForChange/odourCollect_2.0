import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { Observation } from 'src/app/models/observation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DangerComponent } from 'src/app/shared/components/Icons/danger/danger.component';
import { RegisterModalComponent } from 'src/app/modules/modals/register-modal/register-modal.component';

@Component({
  selector: 'app-last-odours',
  templateUrl: './last-odours.component.html',
  styleUrls: ['./last-odours.component.scss'],
})
export class LastOdoursComponent implements OnInit, OnDestroy {
  public isOpen: boolean = false;
  public userObservations!: Observation[] | undefined;

  constructor(
    private router: Router,
    private userService: UserService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.userObservations =
      this.userService.user?.relationships.odourObservations.slice(0, 3);
  }

  public toggleLastOdours(): void {
    this.isOpen = !this.isOpen;
  }

  public onClick(): void {
    if (!this.userService.user) {
      this.modalService.open(RegisterModalComponent, {
        windowClass: 'default',
        backdropClass: 'default',
        centered: true,
        size: 'sm',
      }).componentInstance.config = {
        icon: DangerComponent,
        text: 'Debes estar registrado/a para añadir un olor.',
      };
      return;
    }

    if (!this.userObservations?.length && this.userService.user) {
      this.router.navigate(['/create-odour']);
      return;
    }

    this.userObservations =
      this.userService.user?.relationships.odourObservations.slice(0, 3);

    if (!this.isOpen) {
      this.isOpen = !this.isOpen;
      return;
    }
    if (this.isOpen) {
      this.router.navigate(['/create-odour']);
    }
  }

  ngOnDestroy(): void {
    if (this.isOpen) {
      this.toggleLastOdours();
    }
  }
}
