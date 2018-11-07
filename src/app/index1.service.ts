import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Index1Service {

  private useresUrl = 'hero/add';  // URL to web api
  constructor( private http: HttpClient) { }
  /** POST: add a new user to the server */
add (hero: Hero): Observable<Hero> {
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json','Authorization':'dd2018' })
  };
  return this.http.post<Hero>(this.useresUrl, hero, httpOptions).pipe(
    catchError(this.handleError<Hero>('addUser'))
  );
}


/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
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
