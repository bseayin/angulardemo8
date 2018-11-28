import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'; 
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  user:User=new User();
  private hosturl = 'project2/findUser';
  constructor(private cookieService:CookieService,private http: HttpClient) { }

  getU():Observable<any> {
    let uid=this.cookieService.get("uid");
    console.log("uid"+uid);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','gdpAuthorization1': uid})
    };
    return this.http.get<User>(this.hosturl,httpOptions)
    .pipe(
      catchError(this.handleError('getU', []))
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
