import {
  OdourHedonicTone,
  OdourIntensity,
  OdourSubType,
} from './odour-related-data';
import { User } from './user';

export interface MapObservationRes {
  status: string;
  data: MapObservation[];
}

export interface MapObservation {
  id: number;
  user_id: number;
  latitude: string;
  longitude: string;
  color: number | string;
}

export interface ObservationRes {
  status: string;
  data: Observation[];
}
//La observación principal
export interface Observation {
  id: number;
  color:number,
  latitude: string;
  longitude: string;
  relationships: ObservationRelationships;
  likes: number;
  liked: boolean;
  description: null | string;
  origin: null | string;
  createdAt: string;
  updatedAt: string;
}

export interface ObservationRelationships {
  odourSubType: OdourSubType;
  odourIntensity?: OdourIntensity;
  odourHedonicTone?: OdourHedonicTone;
  comments: Comment[];
  user?: User;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

interface ObservationSpiderfyGeoJson extends Observation {
  iconOffset: [number, number];
}

export interface Feature {
  id: number;
  type: string;
  properties: ObservationSpiderfyGeoJson | MapObservation;
  geometry: Geometry;
}

export interface ObservationGeoJSON {
  type: string;
  features: Feature[];
}


export interface UserRelationships {
  profile: Profile;
}

export interface Profile {
  type: Type;
  name: string;
  surname: null;
  gender: Gender | null;
  birth_year: null | string;
  phone: null;
}
export interface Comment {
  id: number;
  body: string;
  user_id: number | undefined;
  odour_observation_id: number;
  created_at: Date;
  user_avatar_id: number;
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
  createdBetween: string[] | null;
  createdTodayBetween: string[] | null;
  is_inside: number | null;
  latitude: number | null;
  longitude: number | null;
}
