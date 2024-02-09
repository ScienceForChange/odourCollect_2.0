import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observation } from 'src/app/models/observation';
import { User } from 'src/app/models/user';
import { DialogModalComponent } from 'src/app/modules/modals/dialog-modal/dialog-modal.component';
import { UserService } from 'src/app/services/user.service';
import { OdourService } from '../../../../services/odour.service';
import { AlertService } from 'src/app/services/alert.service';
import { BehaviorSubject } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { OffcanvasService } from '../../../../services/offcanvas.service';

enum SortBy {
  CREATED_DESC = 'createdAt_desc',
  CREATED_ASC = 'createdAt_asc',
}

@Component({
  selector: 'app-my-odours',
  templateUrl: './my-odours.component.html',
  styleUrls: ['./my-odours.component.scss'],
})
export class MyOdoursComponent implements OnInit {
  public user!: User | undefined;
  private observationsRef: Observation[] | undefined = [];
  public observations$: BehaviorSubject<Observation[] | undefined> =
    new BehaviorSubject<Observation[] | undefined>([]);
  public sorting: SortBy = SortBy.CREATED_DESC;
  public isOpenFilters$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private odourService: OdourService,
    private alertService: AlertService,
    private navigationService: NavigationService,
    private offcanvasService: OffcanvasService,
  ) {
    this.navigationService.headerTitle = 'Mis olores';
  }

  ngOnInit(): void {
    this.user = this.userService.user;
    const observationsSorted = this.user?.relationships.odourObservations.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    this.observationsRef = observationsSorted;
    this.observations$.next(observationsSorted);
  }

  public openFilters = (): void => {
    this.offcanvasService.openMyOdoursFiltersOffCanvas(
      this.observationsRef,
      this.observations$,
    );
  };

  public send(id: number) {
    //Llamamos al modal de confirmación
    const dialog = this.modalService.open(DialogModalComponent, {
      windowClass: 'default',
      backdropClass: 'default',
      centered: true,
      size: 'sm',
    });
    dialog.componentInstance.config = {
      text: '¿Seguro que quieres eliminar tu observación?',
      acceptButtonText: 'Eliminar',
    };
    dialog.result.catch(
      //si el modal se cierra clicando en "Acpetar" llamamos a delete()
      (reason) => {
        if (reason === true) this.deleteObservation(id); //He de ver comoo pasarle el ID
      },
    );
  }

  private deleteObservation(id: number): void {
    this.odourService.deleteObservation(id).subscribe({
      next: () => {
        this.userService.removeObservation(id);
        const observationsFiltered = this.observations$.value?.filter(
          (observation) => observation.id !== id,
        );
        const observationsUpdated = this.observationsRef?.filter(
          (observation) => observation.id !== id,
        );

        this.observations$.next(observationsFiltered);
        this.observationsRef = observationsUpdated;
        this.alertService.success('Observación eliminada', {
          autoClose: true,
          keepAfterRouteChange: true,
        });
      },
      error: () => {
        this.alertService.error('Hubo un error', {
          autoClose: true,
          keepAfterRouteChange: true,
        });
      },
    });
  }

  public sortedBy(event: any) {
    const observations = this.observations$.value;

    switch (event.target.value) {
      case SortBy.CREATED_ASC:
        const sortAsc = observations?.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        this.observations$.next(sortAsc);
        break;
      case SortBy.CREATED_DESC:
        const sortDesc = observations?.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        this.observations$.next(sortDesc);
        break;
    }
  }

  public filterByName(term: string) {
    if (term.length) {
      const filtered = this.observations$.value?.filter((ob) => {
        const observationType =
          ob.relationships.odourSubType.relationships.odourType.name.toLowerCase();
        const observationSubtype =
          ob.relationships.odourSubType.name.toLowerCase();
        return (
          observationType.includes(term.toLowerCase()) ||
          observationSubtype.includes(term.toLowerCase())
        );
      });
      this.observations$.next(filtered);
    } else {
      this.observations$.next(this.observationsRef);
    }
  }
}
