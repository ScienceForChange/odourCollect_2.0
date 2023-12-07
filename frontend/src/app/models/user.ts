import { Observation } from "./observation";

export class User {

  id:                     undefined | number;
  email:                  string;
  avatar_id:              number;
  total_observations:     number;
  password?:              undefined | string;
  password_confirmation?: undefined | string;
  relationships:          Relationships

  constructor(element: any){
    this.id                                 = element.id;
    this.email                              = element.email;
    this.avatar_id                          = element.avatar_id ? element.avatar_id: 1 ;
    this.total_observations                 = element.total_observations ? element.total_observations: 0 ;
    this.password                           = element.password;
    this.password_confirmation              = element.password_confirmation;
    this.relationships                      = element.relationships;
  }

}

export interface Relationships {
  profile?:           Profile;
  odourObservations:  Observation[];  
}
export interface Profile {
  type:       string;
  name:       string;
  surname:    string | null;
  gender:     string;
  birthYear:  number;
  phone:      string | null;
  avatar_id:  number;
}

export function createDummyUser(): User {

  const dummyProfile: Profile = {
    type: 'dummy',
    name: 'Dummy',
    surname: null,
    gender: 'male',
    birthYear: 1900,
    phone: null,
    avatar_id: 1,
  };

  const dummyRelationships: Relationships = {
    profile: dummyProfile,
    odourObservations: [],
  };

  const dummyUser: User = {
    id: 1,
    email: 'dummy@example.com',
    avatar_id: 1,
    total_observations: 0,
    password: undefined,
    password_confirmation: undefined,
    relationships: dummyRelationships,
  };

  return dummyUser;
}