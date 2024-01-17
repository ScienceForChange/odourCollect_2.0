import {
  OdourHedonicTone,
  OdourIntensity,
  OdourSubType,
} from './odour-related-data';
import { User } from './user';

export interface ObservationRes {
  status: string;
  data: Observation[];
}

//La observación principal
export interface Observation {
  id: number;
  latitude: string;
  longitude: string;
  relationships: ObservationRelationships;
  likes: number;
  liked: boolean;
  description: null | string;
  origin: null | string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ObservationRelationships {
  odourSubType: OdourSubType;
  odourIntensity: OdourIntensity;
  odourHedonicTone: OdourHedonicTone;
  comments: [];
  user?: User;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

interface ObservationSpiderfyGeoJson extends Observation {
  iconOffset: [number,number];
}

export interface Feature {
  id: number;
  observationType: string;
  type: string;
  properties: ObservationSpiderfyGeoJson | Observation;
  geometry: Geometry;
}

export interface ObservationGeoJSON {
  type: string;
  features: Feature[];
}

export enum Name {
  AgricultureLivestock = 'Agriculture / Livestock',
  Alcohol = 'Alcohol',
  Amines = 'Amines',
  Ammines = 'Ammines',
  Ammonia = 'Ammonia',
  AnimalFeed = 'Animal feed',
  AnimalFood = 'Animal food',
  AromaFlavour = 'Aroma / Flavour',
  AsphaltRubber = 'Asphalt / Rubber',
  Bakeries = 'Bakeries',
  Biofilter = 'Biofilter',
  Biogas = 'Biogas',
  BreadCookies = 'Bread / Cookies',
  CabbageSoup = 'Cabbage soup',
  Chemical = 'Chemical',
  ChimneyBurntWood = 'Chimney (burnt wood)',
  Chlorine = 'Chlorine',
  Cocoa = 'Cocoa',
  Coffee = 'Coffee',
  CookedMeat = 'Cooked meat',
  DeadAnimal = 'Dead animal',
  DecomposedWaste = 'Decomposed waste',
  Distinct = 'Distinct',
  ExtremelyPleasant = 'Extremely pleasant',
  ExtremelyStrong = 'Extremely strong',
  ExtremelyUnpleasant = 'Extremely unpleasant',
  FatOil = 'Fat / Oil',
  Fish = 'Fish',
  Flowers = 'Flowers',
  Food = 'Food',
  FoodIndustries = 'Food Industries',
  ForestTreesNature = 'Forest / Trees / Nature',
  FreshGrass = 'Fresh grass',
  FreshWaste = 'Fresh waste',
  Fruit = 'Fruit',
  Fuel = 'Fuel',
  Gas = 'Gas',
  GlueAdhesive = 'Glue / Adhesive',
  HumidityWetSoil = 'Humidity / Wet soil',
  IDonTKnow = "I don't know",
  Industrial = 'Industrial',
  KetoneEsterAcetateEther = 'Ketone / Ester / Acetate / Ether',
  Leachate = 'Leachate',
  Leather = 'Leather',
  MaltHop = 'Malt / Hop',
  Marihuana = 'Marihuana',
  Metal = 'Metal',
  MilkDairy = 'Milk / Dairy',
  MintRosemaryLavander = 'Mint / Rosemary / Lavander',
  Na = 'NA',
  NameWasteWater = 'Waste Water',
  Neutral = 'Neutral',
  NewBook = 'New book',
  Nice = 'Nice',
  NoOdor = 'No Odor',
  NoOdour = 'No Odour',
  NotPerceptible = 'Not perceptible',
  OilPetrochemical = 'Oil / Petrochemical',
  OrganicFertilizersManureSlurry = 'Organic fertilizers (manure/slurry)',
  Other = 'Other',
  Paint = 'Paint',
  Perfume = 'Perfume',
  Plastic = 'Plastic',
  Pleasant = 'Pleasant',
  RawMeat = 'Raw meat',
  RottenEggs = 'Rotten eggs',
  Sea = 'Sea',
  Sewage = 'Sewage',
  SlightlyPleasant = 'Slightly pleasant',
  SlightlyUnpleasant = 'Slightly unpleasant',
  Sludge = 'Sludge',
  Strong = 'Strong',
  Sulphur = 'Sulphur',
  Sweat = 'Sweat',
  Traffic = 'Traffic',
  Unpleasant = 'Unpleasant',
  Urban = 'Urban',
  Urine = 'Urine',
  VaryPleasant = 'Vary pleasant',
  VeryStrong = 'Very strong',
  VeryUnpleasant = 'Very unpleasant',
  VeryWeak = 'Very weak',
  Waste = 'Waste',
  WasteBin = 'Waste bin',
  WasteTruck = 'Waste truck',
  WasteWater = 'Waste water',
  Weak = 'Weak',
  Wood = 'Wood',
}

export enum Slug {
  AgricultureLivestock = 'agriculture-livestock',
  Alcohol = 'alcohol',
  Alcohol2 = 'alcohol-2',
  Amines = 'amines',
  Amines2 = 'amines-2',
  Amines3 = 'amines-3',
  Ammines = 'ammines',
  Ammonia = 'ammonia',
  Ammonia2 = 'ammonia-2',
  Ammonia3 = 'ammonia-3',
  Ammonia4 = 'ammonia-4',
  AnimalFeed = 'animal-feed',
  AnimalFood = 'animal-food',
  AromaFlavour = 'aroma-flavour',
  AsphaltRubber = 'asphalt-rubber',
  Bakeries = 'bakeries',
  Biofilter = 'biofilter',
  Biogas = 'biogas',
  BreadCookies = 'bread-cookies',
  BreadCookies2 = 'bread-cookies-2',
  CabbageSoup = 'cabbage-soup',
  CabbageSoup2 = 'cabbage-soup-2',
  CabbageSoup3 = 'cabbage-soup-3',
  Chemical = 'chemical',
  ChimneyBurntWood = 'chimney-burnt-wood',
  ChimneyBurntWood2 = 'chimney-burnt-wood-2',
  Chlorine = 'chlorine',
  Cocoa = 'cocoa',
  Coffee = 'coffee',
  CookedMeat = 'cooked-meat',
  DeadAnimal = 'dead-animal',
  DecomposedWaste = 'decomposed-waste',
  Distinct = 'distinct',
  ExtremelyPleasant = 'extremely-pleasant',
  ExtremelyStrong = 'extremely-strong',
  ExtremelyUnpleasant = 'extremely-unpleasant',
  FatOil = 'fat-oil',
  Fish = 'fish',
  Flowers = 'flowers',
  Flowers2 = 'flowers-2',
  Food = 'food',
  Food2 = 'food-2',
  FoodIndustries = 'food-industries',
  ForestTreesNature = 'forest-trees-nature',
  FreshGrass = 'fresh-grass',
  FreshGrass2 = 'fresh-grass-2',
  FreshWaste = 'fresh-waste',
  Fruit = 'fruit',
  Fuel = 'fuel',
  Gas = 'gas',
  GlueAdhesive = 'glue-adhesive',
  HumidityWetSoil = 'humidity-wet-soil',
  IDonTKnow = 'i-don-t-know',
  IDonTKnow2 = 'i-don-t-know-2',
  IDonTKnow3 = 'i-don-t-know-3',
  IDonTKnow4 = 'i-don-t-know-4',
  IDonTKnow5 = 'i-don-t-know-5',
  IDonTKnow6 = 'i-don-t-know-6',
  Industrial = 'industrial',
  KetoneEsterAcetateEther = 'ketone-ester-acetate-ether',
  Leachate = 'leachate',
  Leather = 'leather',
  MaltHop = 'malt-hop',
  Marihuana = 'marihuana',
  Metal = 'metal',
  MilkDairy = 'milk-dairy',
  MintRosemaryLavander = 'mint-rosemary-lavander',
  Na = 'na',
  Neutral = 'neutral',
  NewBook = 'new-book',
  Nice = 'nice',
  NoOdor = 'no-odor',
  NoOdour = 'no-odour',
  NotPerceptible = 'not-perceptible',
  OilPetrochemical = 'oil-petrochemical',
  OrganicFertilizersManureSlurry = 'organic-fertilizers-manure-slurry',
  Other = 'other',
  Other2 = 'other-2',
  Other3 = 'other-3',
  Other4 = 'other-4',
  Other5 = 'other-5',
  Other6 = 'other-6',
  Paint = 'paint',
  Perfume = 'perfume',
  Plastic = 'plastic',
  Pleasant = 'pleasant',
  RawMeat = 'raw-meat',
  RottenEggs = 'rotten-eggs',
  RottenEggs2 = 'rotten-eggs-2',
  RottenEggs3 = 'rotten-eggs-3',
  Sea = 'sea',
  Sewage = 'sewage',
  SlightlyPleasant = 'slightly-pleasant',
  SlightlyUnpleasant = 'slightly-unpleasant',
  Sludge = 'sludge',
  Strong = 'strong',
  Sulphur = 'sulphur',
  Sweat = 'sweat',
  Traffic = 'traffic',
  Unpleasant = 'unpleasant',
  Urban = 'urban',
  Urine = 'urine',
  VaryPleasant = 'vary-pleasant',
  VeryStrong = 'very-strong',
  VeryUnpleasant = 'very-unpleasant',
  VeryWeak = 'very-weak',
  Waste = 'waste',
  WasteBin = 'waste-bin',
  WasteTruck = 'waste-truck',
  WasteWater = 'waste-water',
  Weak = 'weak',
  Wood = 'wood',
}

//TODO eliminar estas interfaces pero hay que esperar a que el back las haga

export interface UserRelationships {
  profile: Profile;
}

export interface Profile {
  type: Type;
  name: string;
  surname: null;
  gender: Gender | null;
  birthYear: null | string;
  phone: null;
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export enum Type {
  Citizen = 'Citizen',
}

export interface ObservationQuery {
  type: number[] | null;
  intensity: number[] | null;
  hedonicTone: number[] | null;
  createdBetween: string | null;
  createdTodayBetween: string[] | null;
}
