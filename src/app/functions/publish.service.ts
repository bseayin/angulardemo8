import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Mail } from '../model/mail';
import { User } from '../user';
@Injectable({
  providedIn: 'root'
})
export class PublishService {
  private useresUrl = 'project6/';
  constructor( private http: HttpClient) { }
  //获取可发布人选
  getPublishUser (uid:number,pid:number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    return this.http.get<any>(this.useresUrl+"getPublishUser/"+uid+"/"+pid, httpOptions).pipe(
      catchError(this.handleError<string>('getPublish fail'))
    );
  }
//发布邀请
  publishInvitation (mails:Mail[]): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.useresUrl+"sendMail",mails, httpOptions).pipe(
      
      catchError(this.handleError<any>('addFunctions'))
    );
  }
//刷新邮件数
  refreshMesseges (uid:number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get(this.useresUrl+"refreshMesseges/"+uid, httpOptions).pipe(
      
      catchError(this.handleError<any>('addFunctions'))
    );
  }
//显示信息详情
  displayMesseges (uid:number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get(this.useresUrl+"displayMessege/"+uid, httpOptions).pipe(
      
      catchError(this.handleError<any>('displayMails'))
    );
  }
//接受邀请
  acceptInvitation (user:User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.useresUrl+"acceptInvitation",user,httpOptions).pipe(
      
      catchError(this.handleError<any>('acceptInvitation'))
    );
  }
//拒绝邀请
  refuseInvitation (user:User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.useresUrl+"refuseInvitation",user,httpOptions).pipe(
      
      catchError(this.handleError<any>('refuseInvitation'))
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
