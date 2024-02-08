import { OdourService } from './odour.service';
import {
  OdourCreateForm,
  OdourRelatedDataRes,
} from '../models/odour-related-data';
import { firstValueFrom, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Observation } from '../models/observation';

import { HttpClient } from '@angular/common/http';
import { createDummyUser } from '../models/user';

const odourRelatedDataMock: OdourRelatedDataRes = {
  status: 'success',
  data: {
    OdourType: [
      {
        id: 1,
        name: 'Country And Nature',
        slug: 'country-and-nature',
        relationships: {
          odourSubTypes: [
            {
              id: 1,
              odourTypeId: 1,
              name: 'Flowers',
              slug: 'flowers',
              relationships: [],
            },
            {
              id: 2,
              odourTypeId: 1,
              name: 'Wet Soil',
              slug: 'wet-soil',
              relationships: [],
            },
            {
              id: 3,
              odourTypeId: 1,
              name: 'Grass',
              slug: 'grass',
              relationships: [],
            },
            {
              id: 4,
              odourTypeId: 1,
              name: 'Forest or Trees',
              slug: 'forest-trees-or-nature',
              relationships: [],
            },
            {
              id: 5,
              odourTypeId: 1,
              name: 'Aromatic Plants',
              slug: 'aromatic-plants',
              relationships: [],
            },
            {
              id: 6,
              odourTypeId: 1,
              name: 'Wood',
              slug: 'wood',
              relationships: [],
            },
            {
              id: 7,
              odourTypeId: 1,
              name: 'Burnt Wood',
              slug: 'burnt-wood',
              relationships: [],
            },
            {
              id: 8,
              odourTypeId: 1,
              name: 'Sea',
              slug: 'sea',
              relationships: [],
            },
            {
              id: 9,
              odourTypeId: 1,
              name: 'Rotten Fish',
              slug: 'rotten-fish',
              relationships: [],
            },
            {
              id: 10,
              odourTypeId: 1,
              name: 'Ammonia',
              slug: 'ammonia',
              relationships: [],
            },
            {
              id: 11,
              odourTypeId: 1,
              name: 'Animal Feed',
              slug: 'animal-feed',
              relationships: [],
            },
            {
              id: 12,
              odourTypeId: 1,
              name: 'Hay',
              slug: 'hay',
              relationships: [],
            },
            {
              id: 13,
              odourTypeId: 1,
              name: 'Cabbage Soup',
              slug: 'cabbage-soup',
              relationships: [],
            },
            {
              id: 14,
              odourTypeId: 1,
              name: 'Dead Animal',
              slug: 'dead-animal',
              relationships: [],
            },
            {
              id: 15,
              odourTypeId: 1,
              name: 'Organic Fertilizers (manure and slurry)',
              slug: 'organic-fertilizers',
              relationships: [],
            },
            {
              id: 16,
              odourTypeId: 1,
              name: 'Rotten Eggs',
              slug: 'rotten-eggs',
              relationships: [],
            },
            {
              id: 17,
              odourTypeId: 1,
              name: 'Cooked Meat',
              slug: 'cooked-meat',
              relationships: [],
            },
            {
              id: 18,
              odourTypeId: 1,
              name: 'Other',
              slug: 'other',
              relationships: [],
            },
            {
              id: 19,
              odourTypeId: 1,
              name: 'I dont Know',
              slug: 'i-dont-know',
              relationships: [],
            },
          ],
        },
      },
      {
        id: 2,
        name: 'Urban',
        slug: 'urban',
        relationships: {
          odourSubTypes: [
            {
              id: 20,
              odourTypeId: 2,
              name: 'Flowers',
              slug: 'flowers',
              relationships: [],
            },
            {
              id: 21,
              odourTypeId: 2,
              name: 'Grass',
              slug: 'grass',
              relationships: [],
            },
            {
              id: 22,
              odourTypeId: 2,
              name: 'Perfume',
              slug: 'perfume',
              relationships: [],
            },
            {
              id: 23,
              odourTypeId: 2,
              name: 'Sweat',
              slug: 'sweat',
              relationships: [],
            },
            {
              id: 24,
              odourTypeId: 2,
              name: 'Urine',
              slug: 'urine',
              relationships: [],
            },
            {
              id: 25,
              odourTypeId: 2,
              name: 'Fecal',
              slug: 'fecal',
              relationships: [],
            },
            {
              id: 26,
              odourTypeId: 2,
              name: 'Paint',
              slug: 'paint',
              relationships: [],
            },
            {
              id: 27,
              odourTypeId: 2,
              name: 'Traffic and tyres',
              slug: 'traffic-and-tyres',
              relationships: [],
            },
            {
              id: 28,
              odourTypeId: 2,
              name: 'Sewage system',
              slug: 'sewage-system',
              relationships: [],
            },
            {
              id: 29,
              odourTypeId: 2,
              name: 'Waste Bin',
              slug: 'waste-bin',
              relationships: [],
            },
            {
              id: 30,
              odourTypeId: 2,
              name: 'Waste Truck',
              slug: 'waste-truck',
              relationships: [],
            },
            {
              id: 31,
              odourTypeId: 2,
              name: 'Bookshop',
              slug: 'bookshop',
              relationships: [],
            },
            {
              id: 32,
              odourTypeId: 2,
              name: 'Burnt wood',
              slug: 'burnt-wood',
              relationships: [],
            },
            {
              id: 33,
              odourTypeId: 2,
              name: 'Burnt plastic, rubber or brakes',
              slug: 'burnt-plastic-rubber-brakes',
              relationships: [],
            },
            {
              id: 34,
              odourTypeId: 2,
              name: 'Fuel or solvent',
              slug: 'fuel-or-solvent',
              relationships: [],
            },
            {
              id: 35,
              odourTypeId: 2,
              name: 'Dust',
              slug: 'dust',
              relationships: [],
            },
            {
              id: 36,
              odourTypeId: 2,
              name: 'Putrid',
              slug: 'putrid',
              relationships: [],
            },
            {
              id: 37,
              odourTypeId: 2,
              name: 'Restaurant',
              slug: 'restaurant',
              relationships: [],
            },
            {
              id: 38,
              odourTypeId: 2,
              name: 'Fat and Oil',
              slug: 'fat-and-oil',
              relationships: [],
            },
            {
              id: 39,
              odourTypeId: 2,
              name: 'Other',
              slug: 'other',
              relationships: [],
            },
            {
              id: 40,
              odourTypeId: 2,
              name: 'I dont know',
              slug: 'i-dont-know',
              relationships: [],
            },
          ],
        },
      },
      {
        id: 3,
        name: 'Food',
        slug: 'food',
        relationships: {
          odourSubTypes: [
            {
              id: 41,
              odourTypeId: 3,
              name: 'Bread and cookies',
              slug: 'bread-cookies',
              relationships: [],
            },
            {
              id: 42,
              odourTypeId: 3,
              name: 'Fruit',
              slug: 'fruit',
              relationships: [],
            },
            {
              id: 43,
              odourTypeId: 3,
              name: 'Fish',
              slug: 'fish',
              relationships: [],
            },
            {
              id: 44,
              odourTypeId: 3,
              name: 'Dairy',
              slug: 'dairy',
              relationships: [],
            },
            {
              id: 45,
              odourTypeId: 3,
              name: 'Cocoa',
              slug: 'cocoa',
              relationships: [],
            },
            {
              id: 46,
              odourTypeId: 3,
              name: 'Coffee',
              slug: 'coffee',
              relationships: [],
            },
            {
              id: 47,
              odourTypeId: 3,
              name: 'Alcohol',
              slug: 'alcohol',
              relationships: [],
            },
            {
              id: 48,
              odourTypeId: 3,
              name: 'Beer',
              slug: 'beer',
              relationships: [],
            },
            {
              id: 49,
              odourTypeId: 3,
              name: 'Malt or Hop',
              slug: 'malt-or-hop',
              relationships: [],
            },
            {
              id: 50,
              odourTypeId: 3,
              name: 'Raw Meat',
              slug: 'raw-meat',
              relationships: [],
            },
            {
              id: 51,
              odourTypeId: 3,
              name: 'Fat and Oil',
              slug: 'fat-and-oil',
              relationships: [],
            },
            {
              id: 52,
              odourTypeId: 3,
              name: 'Restaurant',
              slug: 'restaurant',
              relationships: [],
            },
            {
              id: 53,
              odourTypeId: 3,
              name: 'Other',
              slug: 'other',
              relationships: [],
            },
            {
              id: 54,
              odourTypeId: 3,
              name: 'I dont know',
              slug: 'i-dont-know',
              relationships: [],
            },
          ],
        },
      },
      {
        id: 4,
        name: 'Industry',
        slug: 'industry',
        relationships: {
          odourSubTypes: [
            {
              id: 55,
              odourTypeId: 4,
              name: 'Cabbage Soup',
              slug: 'cabbage-soup',
              relationships: [],
            },
            {
              id: 56,
              odourTypeId: 4,
              name: 'Rotten eggs',
              slug: 'rotten-eggs',
              relationships: [],
            },
            {
              id: 57,
              odourTypeId: 4,
              name: 'Oil or petrochemical',
              slug: 'oil-or-petrochemical',
              relationships: [],
            },
            {
              id: 58,
              odourTypeId: 4,
              name: 'Gas',
              slug: 'gas',
              relationships: [],
            },
            {
              id: 59,
              odourTypeId: 4,
              name: 'Asphalt or Rubber',
              slug: 'asphalt-or-rubber',
              relationships: [],
            },
            {
              id: 60,
              odourTypeId: 4,
              name: 'Chemical',
              slug: 'chemical',
              relationships: [],
            },
            {
              id: 61,
              odourTypeId: 4,
              name: 'Ammonia',
              slug: 'ammonia',
              relationships: [],
            },
            {
              id: 62,
              odourTypeId: 4,
              name: 'Leather',
              slug: 'leather',
              relationships: [],
            },
            {
              id: 63,
              odourTypeId: 4,
              name: 'Metal',
              slug: 'metal',
              relationships: [],
            },
            {
              id: 64,
              odourTypeId: 4,
              name: 'Plastic',
              slug: 'plastic',
              relationships: [],
            },
            {
              id: 65,
              odourTypeId: 4,
              name: 'Sulphur',
              slug: 'sulphur',
              relationships: [],
            },
            {
              id: 66,
              odourTypeId: 4,
              name: 'Nail Polish',
              slug: 'nail-polish',
              relationships: [],
            },
            {
              id: 67,
              odourTypeId: 4,
              name: 'Glue or Adhesive',
              slug: 'glue-or-adhesive',
              relationships: [],
            },
            {
              id: 68,
              odourTypeId: 4,
              name: 'Animal food industry',
              slug: 'animal-food-industry',
              relationships: [],
            },
            {
              id: 69,
              odourTypeId: 4,
              name: 'Aroma/Favour',
              slug: 'aroma-or-favour',
              relationships: [],
            },
            {
              id: 70,
              odourTypeId: 4,
              name: 'Alcohol',
              slug: 'alcohol',
              relationships: [],
            },
            {
              id: 71,
              odourTypeId: 4,
              name: 'Other',
              slug: 'other',
              relationships: [],
            },
            {
              id: 72,
              odourTypeId: 4,
              name: 'I dont know',
              slug: 'i-dont-know',
              relationships: [],
            },
          ],
        },
      },
      {
        id: 5,
        name: 'Wastewater and Waste',
        slug: 'wastewater-and-waste',
        relationships: {
          odourSubTypes: [
            {
              id: 73,
              odourTypeId: 5,
              name: 'Ammonia',
              slug: 'ammonia',
              relationships: [],
            },
            {
              id: 74,
              odourTypeId: 5,
              name: 'Biofilter',
              slug: 'biofilter',
              relationships: [],
            },
            {
              id: 75,
              odourTypeId: 5,
              name: 'Biogas',
              slug: 'biogas',
              relationships: [],
            },
            {
              id: 76,
              odourTypeId: 5,
              name: 'Decomposed Waste',
              slug: 'decomposed-waste',
              relationships: [],
            },
            {
              id: 77,
              odourTypeId: 5,
              name: 'Fresh Waste',
              slug: 'fresh-waste',
              relationships: [],
            },
            {
              id: 78,
              odourTypeId: 5,
              name: 'Rotten Eggs',
              slug: 'rotten-eggs',
              relationships: [],
            },
            {
              id: 79,
              odourTypeId: 5,
              name: 'Sludge',
              slug: 'sludge',
              relationships: [],
            },
            {
              id: 80,
              odourTypeId: 5,
              name: 'Cabbage Soup',
              slug: 'cabbage-soup',
              relationships: [],
            },
            {
              id: 81,
              odourTypeId: 5,
              name: 'Fishy',
              slug: 'fishy',
              relationships: [],
            },
            {
              id: 82,
              odourTypeId: 5,
              name: 'Sour Milk',
              slug: 'sour-milk',
              relationships: [],
            },
            {
              id: 83,
              odourTypeId: 5,
              name: 'Detergenty',
              slug: 'detergenty',
              relationships: [],
            },
            {
              id: 84,
              odourTypeId: 5,
              name: 'Garlic',
              slug: 'garlic',
              relationships: [],
            },
            {
              id: 85,
              odourTypeId: 5,
              name: 'Swimming Pool Chlorine',
              slug: 'swimming-pool-chlorine',
              relationships: [],
            },
            {
              id: 86,
              odourTypeId: 5,
              name: 'Moldy',
              slug: 'moldy',
              relationships: [],
            },
            {
              id: 87,
              odourTypeId: 5,
              name: 'Hay',
              slug: 'hay',
              relationships: [],
            },
            {
              id: 88,
              odourTypeId: 5,
              name: 'Waste Water Treatment Station',
              slug: 'waste-water-treatment-station',
              relationships: [],
            },
            {
              id: 89,
              odourTypeId: 5,
              name: 'Other',
              slug: 'other',
              relationships: [],
            },
            {
              id: 90,
              odourTypeId: 5,
              name: 'I dont Know',
              slug: 'i-dont-know',
              relationships: [],
            },
          ],
        },
      },
      {
        id: 6,
        name: 'Other',
        slug: 'other',
        relationships: {
          odourSubTypes: [
            {
              id: 91,
              odourTypeId: 6,
              name: 'NA',
              slug: 'na',
              relationships: [],
            },
          ],
        },
      },
      {
        id: 7,
        name: 'No Odour',
        slug: 'no-odour',
        relationships: {
          odourSubTypes: [
            {
              id: 92,
              odourTypeId: 7,
              name: 'No Odour',
              slug: 'no-odour',
              relationships: [],
            },
          ],
        },
      },
    ],
    OdourIntensity: [
      {
        id: 1,
        name: 'Not perceptible',
        power: 0,
        slug: 'not-perceptible',
      },
      {
        id: 2,
        name: 'Very weak',
        power: 1,
        slug: 'very-weak',
      },
      {
        id: 3,
        name: 'Weak',
        power: 2,
        slug: 'weak',
      },
      {
        id: 4,
        name: 'Distinct',
        power: 3,
        slug: 'distinct',
      },
      {
        id: 5,
        name: 'Strong',
        power: 4,
        slug: 'strong',
      },
      {
        id: 6,
        name: 'Very strong',
        power: 5,
        slug: 'very-strong',
      },
      {
        id: 7,
        name: 'Extremely strong',
        power: 6,
        slug: 'extremely-strong',
      },
    ],
    OdourHedonicTone: [
      {
        id: 1,
        index: -4,
        name: 'Extremely unpleasant',
        slug: 'extremely-unpleasant',
      },
      {
        id: 2,
        index: -3,
        name: 'Very unpleasant',
        slug: 'very-unpleasant',
      },
      {
        id: 3,
        index: -2,
        name: 'Unpleasant',
        slug: 'unpleasant',
      },
      {
        id: 4,
        index: -1,
        name: 'Slightly unpleasant',
        slug: 'slightly-unpleasant',
      },
      {
        id: 5,
        index: 0,
        name: 'Neutral',
        slug: 'neutral',
      },
      {
        id: 6,
        index: 1,
        name: 'Slightly pleasant',
        slug: 'slightly-pleasant',
      },
      {
        id: 7,
        index: 2,
        name: 'Pleasant',
        slug: 'pleasant',
      },
      {
        id: 8,
        index: 3,
        name: 'Vary pleasant',
        slug: 'vary-pleasant',
      },
      {
        id: 9,
        index: 4,
        name: 'Extremely pleasant',
        slug: 'extremely-pleasant',
      },
    ],
  },
};
const odourCreateFormMock: OdourCreateForm = {
  odour_sub_type_id: 0,
  odour_intensity_id: 0,
  odour_hedonic_tone_id: 0,
  latitude: '',
  longitude: '',
  description: '',
  origin: '',
};
const observationsMock: Observation[] = [
  {
    id: 13763,
    latitude: '41.37106',
    longitude: '2.15486',
    color: 8,
    relationships: {
      odourSubType: {
        id: 41,
        odourTypeId: 3,
        name: 'Bread and cookies',
        slug: 'bread-cookies',
        relationships: {
          odourType: {
            id: 3,
            name: 'Food',
            slug: 'food',
            relationships: [],
          },
        },
      },
      user: createDummyUser(),
      comments: [],
    },
    likes: 0,
    liked: false,
    description: null,
    origin: null,
    createdAt: '2024-02-06T15:26:24.000000Z',
    updatedAt: '2024-02-06T15:26:24.000000Z',
  },
  {
    id: 13762,
    latitude: '41.37106',
    longitude: '2.15486',
    color: 8,
    relationships: {
      odourSubType: {
        id: 27,
        odourTypeId: 2,
        name: 'Traffic and tyres',
        slug: 'traffic-and-tyres',
        relationships: {
          odourType: {
            id: 2,
            name: 'Urban',
            slug: 'urban',
            relationships: [],
          },
        },
      },
      user: createDummyUser(),
      comments: [],
    },
    likes: 0,
    liked: false,
    description: null,
    origin: null,
    createdAt: '2024-02-06T15:24:08.000000Z',
    updatedAt: '2024-02-06T15:24:08.000000Z',
  },
];

//Fallará por los modelos de Observations. Estoy a la espera de Carlos.

describe('OdourService', () => {
  let service: OdourService;
  let httpMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpMock = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;
    service = new OdourService(httpMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //ObservatonRelatedData()
  it('observationRelatedData() return a OdourRelatedData and does a get method', (done) => {
    httpMock.get.mockReturnValueOnce(of(odourRelatedDataMock));

    service.observationRelatedData().subscribe((data) => {
      expect(data).toEqual(odourRelatedDataMock);
      expect(httpMock.get).toHaveBeenCalledTimes(1);
      done();
    });
  });

  //createNewOdour()
  it('createNewOdour() return a ObservationRes and does a post method', (done) => {
    httpMock.post.mockReturnValueOnce(
      of({ status: 'success', data: observationsMock }),
    );

    service.createNewOdour(odourCreateFormMock).subscribe((data) => {
      expect(data.data[0].id).toEqual(observationsMock[0].id);
      expect(data.status).toEqual('success');
      expect(httpMock.post).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('createNewOdour() updates the observation$ Subject', async () => {
    httpMock.post.mockReturnValueOnce(
      of({ status: 'success', data: observationsMock }),
    );

    const spyObservation = jest.spyOn(service.observation$, 'next');

    const obs = service.createNewOdour(odourCreateFormMock);
    const result = await firstValueFrom(obs);

    expect(spyObservation).toHaveBeenCalledWith(result.data[0]);
  });

  //getAllOdours()
  it('getAllOdours() updates _observation BehaviorSubject', () => {
    httpMock.get.mockReturnValueOnce(
      of({ status: 'success', data: [observationsMock] }),
    );

    const spyUpdatesObservations = jest.spyOn(service, 'updateObservations');

    service.getAllOdours();

    expect(httpMock.get).toHaveBeenCalledTimes(1);
    expect(spyUpdatesObservations).toHaveBeenCalledTimes(1);
    expect(spyUpdatesObservations).toHaveBeenCalledWith([observationsMock]);
  });

  //getOdourInfo()
  it('getOdourInfo() return a ObservationRes and does a get method', (done) => {
    httpMock.get.mockReturnValueOnce(
      of({ status: 'success', data: observationsMock }),
    );
    service.getOdourInfo(observationsMock[0].id).subscribe((data) => {
      expect(data.data[0].id).toEqual(observationsMock[0].id);
      expect(data.status).toEqual('success');
      expect(httpMock.get).toHaveBeenCalledTimes(1);
      done();
    });
  });

  //filterOdours()
  it('filterOdours() call with the correct parameters', () => {
    const mockQuerys = {
      type: [1, 2, 3],
      intensity: [1, 2],
      hedonicTone: [1, 2],
      createdBetween: ['2023-12-17', '2023-12-18'],
      createdTodayBetween: [
        '2021-01-01T00:00:00.000Z',
        '2021-01-01T00:00:00.000Z',
      ],
    };

    httpMock.get.mockReturnValueOnce(of({ status: 'success', data: [] }));

    const expectedUrl = `${environment.BACKEND_BASE_URL}api/observations/?include=odourSubType.odourType,user.userable&`;
    const filters = Object.entries(mockQuerys)
      .filter(([_, value]) => value)
      .map(([key, value]) => {
        return (
          value && `filter[${key}]=${value?.length ? value.join(',') : value}`
        );
      })
      .join('&');

    service.filterOdours(mockQuerys);

    expect(httpMock.get).toHaveBeenCalledWith(expectedUrl + filters);
  });

  //getOdour()
  it('getOdour() return a ObservationRes and does a get method', (done) => {
    httpMock.get.mockReturnValueOnce(
      of({ status: 'success', data: observationsMock }),
    );

    service.getOdour(1).subscribe(({ data }) => {
      expect(data).toEqual(observationsMock);
      expect(httpMock.get).toHaveBeenCalledTimes(1);
      done();
    });
  });

  //deleteObservation
  it('deleteObservation() return a Observable and does a delete method', (done) => {
    httpMock.delete.mockReturnValueOnce(of({}));

    const observationId = 1;
    const url = `${environment.BACKEND_BASE_URL}api/observations/${observationId}`;
    service.deleteObservation(1).subscribe(() => {
      expect(httpMock.delete).toHaveBeenCalledWith(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      expect(httpMock.delete).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('deleteObservation updates the _observations BehaviorSubject', async () => {
    httpMock.delete.mockReturnValueOnce(of({}));

    const spyUpdatesObservations = jest.spyOn(service, 'updateObservations');

    const obs = service.deleteObservation(1);
    await firstValueFrom(obs);

    expect(spyUpdatesObservations).toHaveBeenCalledTimes(1);
    expect(spyUpdatesObservations).toHaveBeenCalledWith([]);
  });
});
