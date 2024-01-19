import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaryService {

  constructor() { }

  addCommentary(text: any):Observable<any> {
    let commentary = {
      user: {
        id: 2609,
        avatar: 1
      },
      text: text,
      date: new Date(),
    };
    return of(commentary);
    
  }

  deleteCommentary(commentary: any):Observable<any> {
    return of(true);
  }

}
