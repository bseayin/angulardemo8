import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Functions} from './functions'


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private hosturl = 'project3/getAllDoc';
  private hosturl1 = 'project3/allFunction';

  constructor(private http: HttpClient,) { }

  getFunctions (): Observable<Functions[]> {
    return this.http.get<Functions[]>(this.hosturl1)
      .pipe(
        catchError(this.handleError('getFunctions', []))
      );
  }

  


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
