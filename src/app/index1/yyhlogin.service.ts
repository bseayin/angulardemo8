import { Injectable,EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../user';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class YyhloginService {
  private useresUrl = 'project6/';
  public eventEmit:any;
  private hosturl = 'project4/ceshi';
  constructor(private http: HttpClient,private cookie:CookieService) { 
    this.eventEmit=new EventEmitter();
  }
  
  
  ceshilianjie (): Observable<any>{
    let id=this.cookie.get("loginuid");
    const  hostur4 = 'project4/ceshi/'+id;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<any>(hostur4,httpOptions).pipe(
    );
  }
//退出登录
logout(user:User): Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  return this.http.post<any>(this.useresUrl+"logout",user, httpOptions).pipe(
    catchError(this.handleError<User>('logout'))
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
