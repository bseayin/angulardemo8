import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Functions} from './functions'
import { Document} from './document'


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private hosturl = 'project3/getAllDoc';
  private hosturl1 = 'project3/allFunction';
  private hosturl2;
  private hosturl3 = 'project3/savedoc';
  private hosturl4 = 'project3/updateFunction';

  constructor(private http: HttpClient,) { }

  getFunctions (): Observable<Functions[]> {
    return this.http.get<Functions[]>(this.hosturl1)
      .pipe(
        catchError(this.handleError('getFunctions', []))
      );
  }

  getFunction (): Observable<Document[]> {
    return this.http.get<Document[]>(this.hosturl)
      .pipe(
        catchError(this.handleError('getFunction', []))
      );
  }

  savedoc (document:Document):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.hosturl3, document, httpOptions).pipe(
      
      catchError(this.handleError<any>('savedoc'))
    );
  }

  updateFunction (functions:Functions):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.hosturl4, functions, httpOptions).pipe(
      
      catchError(this.handleError<any>('updateFunction'))
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
