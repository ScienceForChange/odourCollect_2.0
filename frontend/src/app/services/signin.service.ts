import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) {}

  postNewUser(user: User):Observable<Object>{
    
    return this.http.post(`${environment.BACKEND_BASE_URL}register`,{...user, ...user.relationships?.profile},{
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },  
      withCredentials: true
    });

  }

}
