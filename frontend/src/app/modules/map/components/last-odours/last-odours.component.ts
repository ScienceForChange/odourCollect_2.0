import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MapModalsService } from 'src/app/services/map-modals.service';
import { UserService } from '../../../../services/user.service';
import { Observation } from 'src/app/models/observation';
import { InfoModalComponent } from 'src/app/modules/modals/info-modal/info-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DangerComponent } from 'src/app/shared/components/Icons/danger/danger.component';
import { RegisterModalComponent } from 'src/app/modules/modals/register-modal/register-modal.component';

@Component({
  selector: 'app-last-odours',
  templateUrl: './last-odours.component.html',
  styleUrls: ['./last-odours.component.scss'],
})
export class LastOdoursComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  public isOpen: boolean = false;
  public userObservations!: Observation[] | undefined;

  constructor(
    private mapModalsService: MapModalsService,
    private router: Router,
    private userService: UserService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.mapModalsService.isVisibleState.subscribe((value) => {
        this.isOpen = value.lastOdours;
      }),
    );
    this.userObservations =
      this.userService.user?.relationships.odourObservations.slice(0, 3);
  }

  public toggleLastOdours(): void {
    this.mapModalsService.toggleLastOdoursModal();
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
        text: 'Debes estar registrado/a para añadir un olor.'
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
      return this.mapModalsService.toggleLastOdoursModal();
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
