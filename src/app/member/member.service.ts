import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable,EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from '../Model/member';
import { CookieService } from 'ngx-cookie-service'; 


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private hosturl = 'project5/getMembers';
  private hosturl2 = 'project5/saveMember';  
  private hosturl4 = 'project5/insertMember'; 

  public eventEmit:any;
  constructor(
    private http: HttpClient,
    private cookie:CookieService
  ) {
    this.eventEmit=new EventEmitter();
   }

   addMember (member: Member): Observable<any> {
    let userid2=this.cookie.get("pid");
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': userid2 })
    };
    return this.http.put(this.hosturl4, member, httpOptions).pipe(
      
      catchError(this.handleError<any>('addMember'))
    );
  }
  getMembers (): Observable<Member[]> {
    let userid2=this.cookie.get("pid");
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': userid2 })
    };
    return this.http.get<Member[]>(this.hosturl,httpOptions)
      .pipe(
        catchError(this.handleError('getMembers', []))
      );
  }


  /** PUT: update the hero on the server */
updateMember (member: Member): Observable<any> {
  let userid2=this.cookie.get("pid");
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': userid2 })
  };
  return this.http.put(this.hosturl2, member, httpOptions).pipe(
    
    catchError(this.handleError<any>('updateMember'))
  );
}


/** DELETE: delete the hero from the server */
deleteMember (id:number): Observable<any>{
  const  hosturl3 = 'project5/removeMember/'+id;

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  return this.http.delete<any>(hosturl3,httpOptions).pipe(
   
    catchError(this.handleError<Member>('deleteMember '))
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