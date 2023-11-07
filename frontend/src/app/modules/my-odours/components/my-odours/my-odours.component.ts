import { Component, OnInit } from '@angular/core';
import { Observation } from 'src/app/models/observation';
import { User } from 'src/app/models/user';
import { FooterService } from 'src/app/services/footer.service';
import { UserService } from 'src/app/services/user.service';

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
  private observationsRef: Observation[] = [];
  public observations: Observation[] = [];
  public sorting: SortBy = SortBy.CREATED_DESC;
  public isOpenFilters: boolean = false;

  constructor(
    private footerService: FooterService,
    private userService: UserService,
  ) {
    this.footerService.visible = true;
  }

  ngOnInit(): void {
    
    this.user = this.userService.user;
    const observations: Observation[] = [
      {
        id: 13885,
        latitude: '41.37106',
        longitude: '2.15486',
        relationships: {
          odourSubType: {
            id: 22,
            name: 'Ammonia',
            slug: 'ammonia-2',
            relationships: {
              odourType: {
                id: 3,
                name: 'Agriculture / Livestock',
                slug: 'agriculture-livestock',
                relationships: {
                  odourSubTypes: [],
                },
              },
            },
          },
          odourIntensity: {
            id: 7,
            name: 'Extremely strong',
            power: 6,
            slug: 'extremely-strong',
          },
          odourHedonicTone: {
            id: 9,
            index: 4,
            name: 'Extremely pleasant',
            slug: 'extremely-pleasant',
          },
        },
        description: null,
        origin: null,
        createdAt: new Date('2023-10-24 16:10:02'),
        updatedAt: new Date('2023-10-24 16:10:02'),
      },
      {
        id: 13884,
        latitude: '41.37106',
        longitude: '2.15486',
        relationships: {
          odourSubType: {
            id: 53,
            name: 'Sulphur',
            slug: 'sulphur',
            relationships: {
              odourType: {
                id: 5,
                name: 'Industrial',
                slug: 'industrial',
                relationships: {
                  odourSubTypes: [],
                },
              },
            },
          },
          odourIntensity: {
            id: 1,
            name: 'Not perceptible',
            power: 0,
            slug: 'not-perceptible',
          },
          odourHedonicTone: {
            id: 7,
            index: 2,
            name: 'Pleasant',
            slug: 'pleasant',
          },
        },
        description: null,
        origin: null,
        createdAt: new Date('2023-10-24 15:10:26'),
        updatedAt: new Date('2023-10-24 15:10:26'),
      },
      {
        id: 13883,
        latitude: '41.37106',
        longitude: '2.15486',
        relationships: {
          odourSubType: {
            id: 50,
            name: 'Leather',
            slug: 'leather',
            relationships: {
              odourType: {
                id: 5,
                name: 'Industrial',
                slug: 'industrial',
                relationships: {
                  odourSubTypes: [],
                },
              },
            },
          },
          odourIntensity: {
            id: 6,
            name: 'Very strong',
            power: 5,
            slug: 'very-strong',
          },
          odourHedonicTone: {
            id: 1,
            index: -4,
            name: 'Extremely unpleasant',
            slug: 'extremely-unpleasant',
          },
        },
        description: null,
        origin: null,
        createdAt: new Date('2023-10-24 15:10:31'),
        updatedAt: new Date('2023-10-24 15:10:31'),
      },
      {
        id: 1000,
        latitude: '-37.63370',
        longitude: '-73.45260',
        relationships: {
          odourSubType: {
            id: 69,
            name: 'Chimney (burnt wood)',
            slug: 'chimney-burnt-wood',
            relationships: {
              odourType: {
                id: 6,
                name: 'Urban',
                slug: 'urban',
                relationships: {
                  odourSubTypes: [],
                },
              },
            },
          },
          odourIntensity: {
            id: 2,
            name: 'Very weak',
            power: 1,
            slug: 'very-weak',
          },
          odourHedonicTone: {
            id: 4,
            index: -1,
            name: 'Slightly unpleasant',
            slug: 'slightly-unpleasant',
          },
        },
        description: 'olor a plastico quemado',
        origin: 'chimeneas',
        createdAt: new Date('2019-11-30 14:11:39'),
        updatedAt: new Date('2019-11-30 16:11:49'),
      },
    ];
    this.observationsRef = observations;
    this.observations = observations;

  }
  // ngOnInit(): void {
  //   // if (this.userService.user?.relationships.observations) {
  //   //   this.user = this.userService.user;
  //   // } else {
  //   //   this.userService.getUserWithOwnObservation().subscribe({
  //   //     next: (res) => {
  //   //       //Res llega como un array con un valor dentro y no puedo acceder a el por typescript.
  //   //       //Los olores no llegan con su tipo.
  //   //       // console.log('res', res);
  //   //       // const observations = res.relationships?.odourObservations;
  //   //       // console.log('observations', observations);
  //   //       this.user = res;
  //   //       // this.observations = res.relationships?.odourObservations;
  //   //     },
  //   //   });
  //   // }
  // }

  public toggleFilters = (): void => {
    this.isOpenFilters = !this.isOpenFilters;
  };

  public resetFilters(): void {
    this.observations = this.observationsRef;
  }

  public deleteObservation(id: number): void {
    const observationsFiltered = this.observations.filter(
      (observation) => observation.id !== id,
    );
    this.observations = observationsFiltered;
  }

  public filterObservations(querys: {
    type: [];
    intensity: number;
    hedonicTone: number;
  }) {
    const observationsFiltered = this.observationsRef.filter((observation) => {
      const observationType =
        observation.relationships.odourSubType.relationships.odourType.id;
      const observationIntensity = observation.relationships.odourIntensity.id;
      const observationHedonicTone =
        observation.relationships.odourHedonicTone.id;

      const haveSameType = querys.type.length
        ? querys.type.some((type: number) => type === observationType)
        : true;
      const haveSameIntensity = querys.intensity === observationIntensity;
      const haveSameHedonictone = querys.hedonicTone === observationHedonicTone;

      return haveSameType && haveSameIntensity && haveSameHedonictone;
    });

    this.observations = observationsFiltered;
  }

  public sortedBy(event: any) {
    switch (event.target.value) {
      case SortBy.CREATED_ASC:
        this.observations = this.observations.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case SortBy.CREATED_DESC:
        this.observations = this.observations.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
    }
  }

  public filterByName(term: string) {
    if (term.length) {
      this.observations = this.observations.filter((ob) => {
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
