import { Injectable,EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Functions } from './functions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service'; 

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  private hosturl = 'project2/findFunctions';
  private hosturl2 = 'project2/saveFunctions';
  private hosturl4 = 'project2/insertFunctions';  

  public eventEmit:any;
  constructor(
    private http: HttpClient,
    private cookie:CookieService
  ) {
    this.eventEmit=new EventEmitter();
   }


  getFunctions (): Observable<Functions[]> {
    let pid=this.cookie.get("pid");
    console.log("pid"+pid);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','gdpAuthorization2': pid})
    };
    return this.http.get<Functions[]>(this.hosturl,httpOptions)
      .pipe(
        catchError(this.handleError('getFunctions', []))
      );
  }


  /** PUT: update the functions on the server */
updateFunctions (functions: Functions): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  return this.http.put(this.hosturl2, functions, httpOptions).pipe(
    
    catchError(this.handleError<any>('updateFunctions'))
  );
}

  /** POST: add the functions on the server */
addFunctions (functions: Functions): Observable<any> {
    let pid=this.cookie.get("pid");
    if(pid==null){
      alert("请创建项目");
    }else{
      functions.projectid=parseInt(pid)/8;
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.post(this.hosturl4, functions, httpOptions).pipe(
        
        catchError(this.handleError<any>('addFunctions'))
      );
    }
  }
  

/** DELETE: delete the functions from the server */
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