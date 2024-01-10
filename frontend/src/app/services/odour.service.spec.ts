import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { OdourService } from './odour.service';
import { TestScheduler } from 'rxjs/testing';
import { Observation, ObservationRes } from '../models/observation';
import { OdourCreateForm } from '../models/odour-related-data';

describe('OdourService', () => {

  let service: OdourService;
  let testScheduler: TestScheduler;
  let httpMock: jest.Mocked<HttpClient>;
  let observation: OdourCreateForm;
  let observationRes: Observation;

  beforeEach(() => {

    httpMock = {
      post: jest.fn(),
      get:  jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;

    service = new OdourService(httpMock);

    observation =
    {
      odour_sub_type_id: 11,
      odour_intensity_id: 4,
      odour_hedonic_tone_id: 4,
      latitude: "41.32550",
      longitude: "2.11150",
      description: '',
      origin: '',
    };

    observationRes =
    {
      id: 9097,
      latitude: "41.32550",
      longitude: "2.11150",
      relationships: {
        odourSubType: {
            id: 11,
            name: "Rotten eggs",
            slug: "rotten-eggs",
            relationships: {
                odourType: {
                    id: 2,
                    name: "Waste Water",
                    slug: "waste-water",
                    relationships: {
                        odourSubTypes: []
                    }
                }
            }
        },
        odourIntensity: {
            id: 4,
            name: "Distinct",
            power: 3,
            slug: "distinct"
        },
        odourHedonicTone: {
            id: 4,
            index: -1,
            name: "Slightly unpleasant",
            slug: "slightly-unpleasant"
        },
      },
      likes: 0,
      description: '',
      origin: '',
      createdAt: new Date("2021-06-14T09:21:16.000000Z"),
      updatedAt: new Date("2021-06-14T09:21:16.000000Z")
    };

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería añadir una observación', () => {
    
    httpMock.post.mockReturnValueOnce(of({ status: 200, data: [observationRes] }));

    const spy = jest.spyOn(service.observation$, 'next');

    const obs$ = service.createNewOdour(observation);
    expect(obs$).toBeTruthy();

    testScheduler.run(({ expectObservable }) => {
      const expectedMarble = "(---a--|)";
      const expectedValues = { a: { status: 200, data: [observationRes] } };
      expectObservable(obs$).toBe(expectedMarble, expectedValues);

    });
    
    expect(spy).toHaveBeenCalledWith(observationRes);
  });

});
