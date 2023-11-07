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
    //element.relationships.odourObservations = element.relationships.odourObservations.sort((a:Observation, b:Observation) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
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
