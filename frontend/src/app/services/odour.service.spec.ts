import { OdourService } from './odour.service';
import {
  OdourCreateForm,
  OdourRelatedDataRes,
} from '../models/odour-related-data';
import {
  firstValueFrom,
  of,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Observation } from '../models/observation';

import { HttpClient } from '@angular/common/http';

const odourRelatedDataMock: OdourRelatedDataRes = {
  status: 'success',
  data: {
    OdourType: [
      {
        id: 1,
        name: 'Waste',
        slug: 'waste',
        relationships: {
          odourSubTypes: [
            {
              id: 1,
              odourTypeId: 1,
              name: 'Fresh waste',
              slug: 'fresh-waste',
              relationships: [],
            },
            {
              id: 2,
              odourTypeId: 1,
              name: 'Decomposed waste',
              slug: 'decomposed-waste',
              relationships: [],
            },
            {
              id: 3,
              odourTypeId: 1,
              name: 'Leachate',
              slug: 'leachate',
              relationships: [],
            },
            {
              id: 4,
              odourTypeId: 1,
              name: 'Biogas',
              slug: 'biogas',
              relationships: [],
            },
            {
              id: 5,
              odourTypeId: 1,
              name: 'Biofilter',
              slug: 'biofilter',
              relationships: [],
            },
            {
              id: 6,
              odourTypeId: 1,
              name: 'Ammonia',
              slug: 'ammonia',
              relationships: [],
            },
            {
              id: 7,
              odourTypeId: 1,
              name: 'Amines',
              slug: 'amines',
              relationships: [],
            },
            {
              id: 8,
              odourTypeId: 1,
              name: 'Other',
              slug: 'other',
              relationships: [],
            },
            {
              id: 9,
              odourTypeId: 1,
              name: "I don't know",
              slug: 'i-don-t-know',
              relationships: [],
            },
          ],
        },
      },
      {
        id: 2,
        name: 'Waste Water',
        slug: 'waste-water',
        relationships: {
          odourSubTypes: [
            {
              id: 10,
              odourTypeId: 2,
              name: 'Waste water',
              slug: 'waste-water',
              relationships: [],
            },
            {
              id: 11,
              odourTypeId: 2,
              name: 'Rotten eggs',
              slug: 'rotten-eggs',
              relationships: [],
            },
            {
              id: 12,
              odourTypeId: 2,
              name: 'Sludge',
              slug: 'sludge',
              relationships: [],
            },
            {
              id: 13,
              odourTypeId: 2,
              name: 'Chlorine',
              slug: 'chlorine',
              relationships: [],
            },
            {
              id: 14,
              odourTypeId: 2,
              name: 'Other',
              slug: 'other-2',
              relationships: [],
            },
            {
              id: 15,
              odourTypeId: 2,
              name: "I don't know",
              slug: 'i-don-t-know-2',
              relationships: [],
            },
          ],
        },
      },
      {
        id: 3,
        name: 'Agriculture / Livestock',
        slug: 'agriculture-livestock',
        relationships: {
          odourSubTypes: [
            {
              id: 16,
              odourTypeId: 3,
              name: 'Dead animal',
              slug: 'dead-animal',
              relationships: [],
            },
            {
              id: 17,
              odourTypeId: 3,
              name: 'Cooked meat',
              slug: 'cooked-meat',
              relationships: [],
            },
            {
              id: 18,
              odourTypeId: 3,
              name: 'Organic fertilizers (manure/slurry)',
              slug: 'organic-fertilizers-manure-slurry',
              relationships: [],
            },
            {
              id: 19,
              odourTypeId: 3,
              name: 'Animal feed',
              slug: 'animal-feed',
              relationships: [],
            },
            {
              id: 20,
              odourTypeId: 3,
              name: 'Cabbage soup',
              slug: 'cabbage-soup',
              relationships: [],
            },
            {
              id: 21,
              odourTypeId: 3,
              name: 'Rotten eggs',
              slug: 'rotten-eggs-2',
              relationships: [],
            },
            {
              id: 22,
              odourTypeId: 3,
              name: 'Ammonia',
              slug: 'ammonia-2',
              relationships: [],
            },
            {
              id: 23,
              odourTypeId: 3,
              name: 'Amines',
              slug: 'amines-2',
              relationships: [],
            },
            {
              id: 24,
              odourTypeId: 3,
              name: 'Other',
              slug: 'other-3',
              relationships: [],
            },
            {
              id: 25,
              odourTypeId: 3,
              name: "I don't know",
              slug: 'i-don-t-know-3',
              relationships: [],
            },
          ],
        },
      },
      {
        id: 4,
        name: 'Food Industries',
        slug: 'food-industries',
        relationships: {
          odourSubTypes: [
            {
              id: 26,
              odourTypeId: 4,
              name: 'Fat / Oil',
              slug: 'fat-oil',
              relationships: [],
            },
            {
              id: 27,
              odourTypeId: 4,
              name: 'Coffee',
              slug: 'coffee',
              relationships: [],
            },
            {
              id: 28,
              odourTypeId: 4,
              name: 'Cocoa',
              slug: 'cocoa',
              relationships: [],
            },
            {
              id: 29,
              odourTypeId: 4,
              name: 'Milk / Dairy',
              slug: 'milk-dairy',
              relationships: [],
            },
            {
              id: 30,
              odourTypeId: 4,
              name: 'Animal food',
              slug: 'animal-food',
              relationships: [],
            },
            {
              id: 31,
              odourTypeId: 4,
              name: 'Ammonia',
              slug: 'ammonia-3',
              relationships: [],
            },
            {
              id: 32,
              odourTypeId: 4,
              name: 'Malt / Hop',
              slug: 'malt-hop',
              relationships: [],
            },
            {
              id: 33,
              odourTypeId: 4,
              name: 'Fish',
              slug: 'fish',
              relationships: [],
            },
            {
              id: 34,
              odourTypeId: 4,
              name: 'Bakeries',
              slug: 'bakeries',
              relationships: [],
            },
            {
              id: 35,
              odourTypeId: 4,
              name: 'Raw meat',
              slug: 'raw-meat',
              relationships: [],
            },
            {
              id: 36,
              odourTypeId: 4,
              name: 'Ammines',
              slug: 'ammines',
              relationships: [],
            },
            {
              id: 37,
              odourTypeId: 4,
              name: 'Cabbage soup',
              slug: 'cabbage-soup-2',
              relationships: [],
            },
            {
              id: 38,
              odourTypeId: 4,
              name: 'Rotten eggs',
              slug: 'rotten-eggs-3',
              relationships: [],
            },
            {
              id: 39,
              odourTypeId: 4,
              name: 'Bread / Cookies',
              slug: 'bread-cookies',
              relationships: [],
            },
            {
              id: 40,
              odourTypeId: 4,
              name: 'Alcohol',
              slug: 'alcohol',
              relationships: [],
            },
            {
              id: 41,
              odourTypeId: 4,
              name: 'Aroma / Flavour',
              slug: 'aroma-flavour',
              relationships: [],
            },
            {
              id: 42,
              odourTypeId: 4,
              name: 'Other',
              slug: 'other-4',
              relationships: [],
            },
            {
              id: 43,
              odourTypeId: 4,
              name: "I don't know",
              slug: 'i-don-t-know-4',
              relationships: [],
            },
          ],
        },
      },
      {
        id: 5,
        name: 'Industrial',
        slug: 'industrial',
        relationships: {
          odourSubTypes: [
            {
              id: 44,
              odourTypeId: 5,
              name: 'Cabbage soup',
              slug: 'cabbage-soup-3',
              relationships: [],
            },
            {
              id: 45,
              odourTypeId: 5,
              name: 'Oil / Petrochemical',
              slug: 'oil-petrochemical',
              relationships: [],
            },
            {
              id: 46,
              odourTypeId: 5,
              name: 'Gas',
              slug: 'gas',
              relationships: [],
            },
            {
              id: 47,
              odourTypeId: 5,
              name: 'Asphalt / Rubber',
              slug: 'asphalt-rubber',
              relationships: [],
            },
            {
              id: 48,
              odourTypeId: 5,
              name: 'Chemical',
              slug: 'chemical',
              relationships: [],
            },
            {
              id: 49,
              odourTypeId: 5,
              name: 'Ammonia',
              slug: 'ammonia-4',
              relationships: [],
            },
            {
              id: 50,
              odourTypeId: 5,
              name: 'Leather',
              slug: 'leather',
              relationships: [],
            },
            {
              id: 51,
              odourTypeId: 5,
              name: 'Metal',
              slug: 'metal',
              relationships: [],
            },
            {
              id: 52,
              odourTypeId: 5,
              name: 'Plastic',
              slug: 'plastic',
              relationships: [],
            },
            {
              id: 53,
              odourTypeId: 5,
              name: 'Sulphur',
              slug: 'sulphur',
              relationships: [],
            },
            {
              id: 54,
              odourTypeId: 5,
              name: 'Alcohol',
              slug: 'alcohol-2',
              relationships: [],
            },
            {
              id: 55,
              odourTypeId: 5,
              name: 'Ketone / Ester / Acetate / Ether',
              slug: 'ketone-ester-acetate-ether',
              relationships: [],
            },
            {
              id: 56,
              odourTypeId: 5,
              name: 'Amines',
              slug: 'amines-3',
              relationships: [],
            },
            {
              id: 57,
              odourTypeId: 5,
              name: 'Glue / Adhesive',
              slug: 'glue-adhesive',
              relationships: [],
            },
          ],
        },
      },
      {
        id: 6,
        name: 'Urban',
        slug: 'urban',
        relationships: {
          odourSubTypes: [
            {
              id: 58,
              odourTypeId: 6,
              name: 'Urine',
              slug: 'urine',
              relationships: [],
            },
            {
              id: 59,
              odourTypeId: 6,
              name: 'Traffic',
              slug: 'traffic',
              relationships: [],
            },
            {
              id: 60,
              odourTypeId: 6,
              name: 'Sewage',
              slug: 'sewage',
              relationships: [],
            },
            {
              id: 61,
              odourTypeId: 6,
              name: 'Waste bin',
              slug: 'waste-bin',
              relationships: [],
            },
            {
              id: 62,
              odourTypeId: 6,
              name: 'Waste truck',
              slug: 'waste-truck',
              relationships: [],
            },
            {
              id: 63,
              odourTypeId: 6,
              name: 'Sweat',
              slug: 'sweat',
              relationships: [],
            },
            {
              id: 64,
              odourTypeId: 6,
              name: 'Marihuana',
              slug: 'marihuana',
              relationships: [],
            },
            {
              id: 65,
              odourTypeId: 6,
              name: 'Fresh grass',
              slug: 'fresh-grass',
              relationships: [],
            },
            {
              id: 66,
              odourTypeId: 6,
              name: 'Humidity / Wet soil',
              slug: 'humidity-wet-soil',
              relationships: [],
            },
            {
              id: 67,
              odourTypeId: 6,
              name: 'Flowers',
              slug: 'flowers',
              relationships: [],
            },
            {
              id: 68,
              odourTypeId: 6,
              name: 'Food',
              slug: 'food',
              relationships: [],
            },
            {
              id: 69,
              odourTypeId: 6,
              name: 'Chimney (burnt wood)',
              slug: 'chimney-burnt-wood',
              relationships: [],
            },
            {
              id: 70,
              odourTypeId: 6,
              name: 'Paint',
              slug: 'paint',
              relationships: [],
            },
            {
              id: 71,
              odourTypeId: 6,
              name: 'Fuel',
              slug: 'fuel',
              relationships: [],
            },
            {
              id: 72,
              odourTypeId: 6,
              name: 'Other',
              slug: 'other-5',
              relationships: [],
            },
            {
              id: 73,
              odourTypeId: 6,
              name: "I don't know",
              slug: 'i-don-t-know-5',
              relationships: [],
            },
          ],
        },
      },
      {
        id: 7,
        name: 'Nice',
        slug: 'nice',
        relationships: {
          odourSubTypes: [
            {
              id: 74,
              odourTypeId: 7,
              name: 'Flowers',
              slug: 'flowers-2',
              relationships: [],
            },
            {
              id: 75,
              odourTypeId: 7,
              name: 'Food',
              slug: 'food-2',
              relationships: [],
            },
            {
              id: 76,
              odourTypeId: 7,
              name: 'Bread / Cookies',
              slug: 'bread-cookies-2',
              relationships: [],
            },
            {
              id: 77,
              odourTypeId: 7,
              name: 'Fruit',
              slug: 'fruit',
              relationships: [],
            },
            {
              id: 78,
              odourTypeId: 7,
              name: 'Fresh grass',
              slug: 'fresh-grass-2',
              relationships: [],
            },
            {
              id: 79,
              odourTypeId: 7,
              name: 'Forest / Trees / Nature',
              slug: 'forest-trees-nature',
              relationships: [],
            },
            {
              id: 80,
              odourTypeId: 7,
              name: 'Mint / Rosemary / Lavander',
              slug: 'mint-rosemary-lavander',
              relationships: [],
            },
            {
              id: 81,
              odourTypeId: 7,
              name: 'Sea',
              slug: 'sea',
              relationships: [],
            },
            {
              id: 82,
              odourTypeId: 7,
              name: 'Perfume',
              slug: 'perfume',
              relationships: [],
            },
            {
              id: 83,
              odourTypeId: 7,
              name: 'Chimney (burnt wood)',
              slug: 'chimney-burnt-wood-2',
              relationships: [],
            },
            {
              id: 84,
              odourTypeId: 7,
              name: 'Wood',
              slug: 'wood',
              relationships: [],
            },
            {
              id: 85,
              odourTypeId: 7,
              name: 'New book',
              slug: 'new-book',
              relationships: [],
            },
            {
              id: 86,
              odourTypeId: 7,
              name: 'Other',
              slug: 'other-6',
              relationships: [],
            },
            {
              id: 87,
              odourTypeId: 7,
              name: "I don't know",
              slug: 'i-don-t-know-6',
              relationships: [],
            },
          ],
        },
      },
      {
        id: 8,
        name: 'Other',
        slug: 'other',
        relationships: {
          odourSubTypes: [
            {
              id: 88,
              odourTypeId: 8,
              name: 'NA',
              slug: 'na',
              relationships: [],
            },
          ],
        },
      },
      {
        id: 9,
        name: 'No Odor',
        slug: 'no-odor',
        relationships: {
          odourSubTypes: [
            {
              id: 89,
              odourTypeId: 9,
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
    id: 12950,
    latitude: '41.42100',
    longitude: '2.13900',
    relationships: {
      odourSubType: {
        id: 88,
        odourTypeId: 8,
        name: 'NA',
        slug: 'na',
        relationships: {
          odourType: {
            id: 8,
            name: 'Other',
            slug: 'other',
            relationships: [],
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
        id: 5,
        index: 0,
        name: 'Neutral',
        slug: 'neutral',
      },
      user: {
        id: 2353,
        email: 'bruno.estevez.pt@gmail.com',
        avatar_id: 1,
        total_observations: 0,
        relationships: {
          profile: {
            type: 'Citizen',
            name: '',
            avatar_id: 1,
            surname: null,
            gender: 'female',
            birthYear: 1998,
            phone: null,
          },
          odourObservations: [],
        },
      },
    },
    description: null,
    origin: null,
    createdAt: new Date(),
    updatedAt: new Date(),
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
