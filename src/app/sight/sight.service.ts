import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable,EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Sight } from './sight';


@Injectable({
  providedIn: 'root'
})
export class SightService {
  private hosturl = 'project5/findSlight';
  private hosturl2 = 'project5/saveSlight';  

  public eventEmit:any;
  constructor(
    private http: HttpClient
  ) {
    this.eventEmit=new EventEmitter();
   }


  getSlights (): Observable<Sight[]> {
    return this.http.get<Sight[]>(this.hosturl)
      .pipe(
        catchError(this.handleError('getSlights', []))
      );
  }


  /** PUT: update the hero on the server */
updateSlight (sight: Sight): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  return this.http.put(this.hosturl2, sight, httpOptions).pipe(
    
    catchError(this.handleError<any>('updateFunctions'))
  );
}


/** DELETE: delete the hero from the server */
deleteSlight (id:number): Observable<any>{
  const  hosturl3 = 'project5/removeSlight/'+id;
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  return this.http.delete<any>(hosturl3,httpOptions).pipe(
   
    catchError(this.handleError<Sight>('deleteSlight '))
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