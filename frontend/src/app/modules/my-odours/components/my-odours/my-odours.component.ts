import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observation } from 'src/app/models/observation';
import { User } from 'src/app/models/user';
import { DialogModalComponent } from 'src/app/modules/modals/dialog-modal/dialog-modal.component';
import { FooterService } from 'src/app/services/footer.service';
import { UserService } from 'src/app/services/user.service';
import { OdourService } from '../../../../services/odour.service';
import { AlertService } from 'src/app/services/alert.service';
import { BehaviorSubject } from 'rxjs';

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
  public observations: Observation[] | undefined = [];
  public sorting: SortBy = SortBy.CREATED_DESC;
  public isOpenFilters$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private footerService: FooterService,
    private userService: UserService,
    private modalService: NgbModal,
    private odourService: OdourService,
    private alertService: AlertService,
  ) {
    this.footerService.visible = true;
  }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.observationsRef = this.user?.relationships.odourObservations;
    this.observations = this.user?.relationships.odourObservations;
  }

  public toggleFilters = (): void => {
    this.isOpenFilters$.next(!this.isOpenFilters$.value);
  };

  public resetFilters(): void {
    this.observations = this.observationsRef;
  }

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
        const observationsFiltered = this.observations?.filter(
          (observation) => observation.id !== id,
        );
        this.observations = observationsFiltered;
        this.observationsRef = observationsFiltered;
        this.alertService.success('Observacion eliminada', {
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

  public filterObservations(querys: {
    type: [];
    intensity: number[];
    hedonicTone: number[];
  }) {

    const observationsFiltered = this.observationsRef?.filter((observation) => {
      const observationType =
        observation.relationships.odourSubType.relationships.odourType.id;
      const observationIntensity = observation.relationships.odourIntensity.id;
      const observationHedonicTone =
        observation.relationships.odourHedonicTone.id;

      const haveSameType = querys.type.length
        ? querys.type.some((type: number) => type === observationType)
        : true;

      const haveSameIntensity =
        querys.intensity[0] <= observationIntensity &&
        querys.intensity[1] >= observationIntensity;

      const haveSameHedonictone =
        querys.hedonicTone[0] <= observationHedonicTone &&
        querys.hedonicTone[1] >= observationHedonicTone;

      return haveSameType && haveSameIntensity && haveSameHedonictone;
    });

    this.observations = observationsFiltered;
  }

  public sortedBy(event: any) {
    switch (event.target.value) {
      case SortBy.CREATED_ASC:
        this.observations = this.observations?.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case SortBy.CREATED_DESC:
        this.observations = this.observations?.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
    }
  }

  public filterByName(term: string) {
    if (term.length) {
      this.observations = this.observations?.filter((ob) => {
        const observationType =
          ob.relationships.odourSubType.relationships.odourType.name.toLowerCase();
        const observationSubtype =
          ob.relationships.odourSubType.name.toLowerCase();
        return (
          observationType.includes(term.toLowerCase()) ||
          observationSubtype.includes(term.toLowerCase())
        );
      });
    } else {
      this.observations = this.observationsRef;
    }
  }
}
