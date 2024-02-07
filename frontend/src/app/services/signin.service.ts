import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { SingUpUser, User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) {}

  postNewUser(user: SingUpUser):Observable<Object>{
    
    return this.http.post(`${environment.BACKEND_BASE_URL}register`,{...user},{
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },  
      withCredentials: true
    });

  }

}
