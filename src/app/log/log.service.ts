import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Dplog } from './dplog';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private hosturl = 'project4/getAllLog';
  private hosturl2 = 'project4/saveFunctions';
  private hosturl4 = 'project4/insertFunctions';
  
  public eventEmit:any;
  constructor(
    private http: HttpClient
  ) {
    this.eventEmit=new EventEmitter();
   }

   getDplog (): Observable<Dplog[]> {
    return this.http.get<Dplog[]>(this.hosturl)
      .pipe(
        catchError(this.handleError('getDplog', []))
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
