import { Injectable,EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private hosturl = 'core/alluser';  // URL to query
  private hostur2 = 'core/saveuser';  // URL to update
  private hostur3 = 'core/removeuser';  // URL to update
  public eventEmit:any;
  constructor(
    private http: HttpClient
  ) {
    this.eventEmit=new EventEmitter();
   }


  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.hosturl)
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }


  /** PUT: update the hero on the server */
updateUser (user: User): Observable<any> {
  console.log('----updateUser---');
  console.log(user);
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  return this.http.put(this.hostur2, user, httpOptions).pipe(
    
    catchError(this.handleError<any>('updateUser'))
  );
}


/** DELETE: delete the hero from the server */
deleteUser (id:number): Observable<any>{
  console.log('----deleteUser---'+id);
  const  hostur4 = 'core/removeuser/'+id;
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  return this.http.delete<any>(hostur4,httpOptions).pipe(
   
    catchError(this.handleError<User>('deleteUser'))
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
