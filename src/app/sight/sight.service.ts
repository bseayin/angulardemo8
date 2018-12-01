import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable,EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Sight } from '../Model/sight';
import { CookieService } from 'ngx-cookie-service'; 


@Injectable({
  providedIn: 'root'
})
export class SightService {
  private hosturl = 'project5/getSights';
  private hosturl2 = 'project5/saveSight';  
  private hosturl4 = 'project5/insertSight'; 

  public eventEmit:any;
  constructor(
    private http: HttpClient,
    private cookie:CookieService
  ) {
    this.eventEmit=new EventEmitter();
   }

   addSight (sight: Sight): Observable<any> {

    let userid2=this.cookie.get("pid");
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': userid2 })
    };
    console.log(sight.sname);
    console.log(sight.sightstart);
    sight.projectid=59;
    return this.http.put(this.hosturl4, sight, httpOptions).pipe(
      
      catchError(this.handleError<any>('addSight'))
    );
  }
  getSlights (): Observable<Sight[]> {
    let userid2=this.cookie.get("pid");
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': userid2 })
    };
    return this.http.get<Sight[]>(this.hosturl,httpOptions)
      .pipe(
        catchError(this.handleError('getSights', []))
      );
  }


  /** PUT: update the hero on the server */
updateSight (sight: Sight): Observable<any> {
  
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  return this.http.put(this.hosturl2, sight, httpOptions).pipe(
    
    catchError(this.handleError<any>('updateSight'))
  );
}


/** DELETE: delete the hero from the server */
deleteSlight (id:number): Observable<any>{
  const  hosturl3 = 'project5/removeSight/'+id;
  
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