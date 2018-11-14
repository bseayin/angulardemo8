import { Injectable,EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Functions } from './functions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  private hosturl = 'project2/findFunctions';
  private hosturl2 = 'project2/saveFunctions';
  private hosturl4 = 'project2/insertFunctions';  

  public eventEmit:any;
  constructor(
    private http: HttpClient
  ) {
    this.eventEmit=new EventEmitter();
   }


  getFunctions (): Observable<Functions[]> {
    return this.http.get<Functions[]>(this.hosturl)
      .pipe(
        catchError(this.handleError('getFunctions', []))
      );
  }


  /** PUT: update the hero on the server */
updateFunctions (functions: Functions): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  return this.http.put(this.hosturl2, functions, httpOptions).pipe(
    
    catchError(this.handleError<any>('updateFunctions'))
  );
}

  /** PUT: update the hero on the server */
  addFunctions (functions: Functions): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.hosturl4, functions, httpOptions).pipe(
      
      catchError(this.handleError<any>('addFunctions'))
    );
  }
  

/** DELETE: delete the hero from the server */
deleteFunctions (id:number): Observable<any>{
  const  hosturl3 = 'project2/removeFunctions/'+id;
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  return this.http.delete<any>(hosturl3,httpOptions).pipe(
   
    catchError(this.handleError<Functions>('deleteFunctions'))
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